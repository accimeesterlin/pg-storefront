import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { getOrderById } from "../../../queries/getOrder";
import { authenticationMiddleware } from "../../../token/verify";
import { currency, getTotalPrice, groupByShopId } from "@utils/utils";
import { createOrder } from "pages/api/mutation/order";
import Order from "@models/order.model";
import {  getUserById } from "pages/api/queries/getUser";
import { getShopById } from "pages/api/queries/getShop";
import Shop from "@models/shop.model";
import { increaseBalance } from "pages/api/mutation/balance";

const getHandler = async (req, res) => {
  try {
    const query = req?.query;

    const orderId = query?.orderId;
    const order: Order = await getOrderById(orderId)


    const customerId = order?.customerId;
    const customer: User = await getUserById(customerId);

    const firstName = customer?.firstName;
    const lastName = customer?.lastName;

    let name =  `${firstName} ${lastName}`;

    if (!firstName || !lastName) {
      name = customer?.fullName || customer?.email || "Customer"
    }


    if (order?.paymentStatus === "paid") {
      return res.status(500).json({
        message: "Order is already completed",
      });
    }

    if (order?.status !== "completed") {
        return res.status(500).json({
          message: "Order is not valid, please contact support",
        });
      }

    const productsByShopId = groupByShopId(order?.products);

    // TODO: Calculate Platform Fees
    // Handle multiple shop orders
    const shopOrders = await Promise.all(
        Object.keys(productsByShopId).map(async (shopId) => {
            const products = productsByShopId[shopId];
            const totalPrice = getTotalPrice(products);

            const shopOwner: Shop = await getShopById(shopId);
            const merchantId = shopOwner?.merchantId;

            const balancePayload = {
                userID: merchantId,
                id: merchantId,
                amount: totalPrice,
            }

            const balance = await increaseBalance(balancePayload);

            const newBalance = balance?.amount;
            const description = `${name} bought ${products?.length} products for a total of ${currency(totalPrice)}. Your updated balance is ${currency(newBalance)}`

            const orderPayload = {
                id: uuidv4(),
                shopId,
                orderId,
                customerId,
                products,
                totalPrice,
                description,
                amount: totalPrice,
                status: "completed",
                paymentStatus: "paid",
                paymentMethod: order?.paymentMethod,
                channel: order?.channel,
                paymentId: order?.paymentId,
                platform: order?.platform,
                transactionType: "sales",
                userID: merchantId,
            }
            await createOrder(orderPayload);

            return orderPayload;
        })
    );

    // Order is paid, update order status
    const orderPayload = {
        ...order,
        paymentStatus: "paid",
    }
    await createOrder(orderPayload);
    
    return res.json({
        shopOrders,
        customer,
        order: orderPayload
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding order",
    });
  }
};

// Define schema for customer
export const payloadSchema = Joi.object({
  cart: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      shopId: Joi.string().required(),
      id: Joi.string().required(), // productId
      mainImageUrl: Joi.string().required(),
      price: Joi.number().required(),
      qty: Joi.number().required(),
      slug: Joi.string().required(),
    })
  ),
  checkout: Joi.object({
    address: Joi.object({
      name: Joi.string().required(),
      company: Joi.string().required(),
      street: Joi.string().required(),
      apartment: Joi.string().allow(null, ""),
      city: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().required(),
      state: Joi.string().allow(null, ""),
      zip: Joi.string().required(),
    }),
    billingAddress: Joi.object({
      name: Joi.string().required(),
      company: Joi.string().allow(null, ""),
      street: Joi.string().required(),
      apartment: Joi.string().allow(null, ""),
      city: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().required(),
      state: Joi.string().allow(null, ""),
      zip: Joi.string().required(),
    }),
    paymentMethod: Joi.string().allow(null, ""),
  }),
});



export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
