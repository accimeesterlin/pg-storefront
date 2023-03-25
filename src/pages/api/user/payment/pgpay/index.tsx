import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { getAddressByUserId } from "../../../queries/getAddress";
import { getBalanceById } from "../../../queries/getBalance";
import { getOrderByUserId } from "../../../queries/getOrder";
import { authenticationMiddleware } from "../../../token/verify";
import { currency, getTotalPrice, groupByShopId } from "@utils/utils";
import { createOrder } from "pages/api/mutation/order";
import { getShopById } from "pages/api/queries/getShop";
import { decreaseBalance, increaseBalance } from "pages/api/mutation/balance";
import Shop from "@models/shop.model";

const pgMerchantID = process.env.PLATFORM_MERCHANT_ID;

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    // Execute the database queries in parallel
    const [balance, addresses, orders] = await Promise.all([
      getBalanceById(userID),
      getAddressByUserId(userID),
      getOrderByUserId(userID),
    ]);

    if (user?.apiKeySecret) {
      delete user?.apiKeySecret;
    }
    return res.json({
      ...user,
      addresses,
      orders,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

// Define schema for customer
export const payloadSchema = Joi.object({
  cart: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      shopId: Joi.string().default(pgMerchantID),
      id: Joi.string().required(), // productId
      mainImageUrl: Joi.string().required(),
      price: Joi.number().required(),
      qty: Joi.number().required(),
      slug: Joi.string().allow(null, ""),
    })
  ),
  checkout: Joi.object({
    address: Joi.object({
      name: Joi.string().required(),
      company: Joi.string().allow(null, ""),
      street: Joi.string().required(),
      apartment: Joi.string().allow(null, ""),
      city: Joi.string().allow(null, ""), // TODO: make this required
      country: Joi.string().required(),
      phone: Joi.string().required(),
      state: Joi.string().allow(null, ""),

      // Order
      userID: Joi.string().allow(null, ""),
      updatedAt: Joi.string().allow(null, ""),
      createdAt: Joi.string().allow(null, ""),

      
      id: Joi.string().allow(null, ""),
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

const updateHandler = async (req, res) => {
  try {
    const payload = await payloadSchema.validateAsync(req?.body);
    const user: User = req?.tokenData?.user;

    const customerId = user?.id;

    const orderId = uuidv4();

    const products = payload?.cart || [];
    const amount = getTotalPrice(products);

    const orderPayload = {
      id: orderId,
      orderId,
      customerId,
      sender: user?.email,
      platform: "marketplace",
      status: "completed",
      paymentStatus: "paid",
      shippingStatus: "pending",
      products, // []
      channel: "web",
      shippingAddress: payload?.checkout?.address,
      amount,
      paymentId: orderId,
      shippingRate: 0,
      totalPrice: amount,
      paymentMethod: "pgpay",
      quantity: products?.reduce((acc, item) => acc + item?.qty, 0),
      userID: user?.id,
      transactionType: "sales",
    };

    await decreaseBalance({
      userID: customerId,
      id: customerId,
      amount,
    });

    const order: any = await createOrder(orderPayload);

    // Process the payment here
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    let name = `${firstName} ${lastName}`;

    if (!firstName || !lastName) {
      name = user?.fullName || user?.email || "Customer";
    }

    const productsByShopId = groupByShopId(products);

    // Handle multiple shop orders
    const shopOrders = await Promise.all(
      Object.keys(productsByShopId).map(async (shopId) => {
        const products = productsByShopId[shopId];
        // TODO: Calculate Platform Fees
        const totalPrice = getTotalPrice(products);

        const shopOwner: Shop = await getShopById(shopId);
        const merchantId = shopOwner?.merchantId;

        const balancePayload = {
          userID: merchantId,
          id: merchantId,
          amount: totalPrice,
        };

        const balance = await increaseBalance(balancePayload);

        const newBalance = balance?.amount;
        const description = `${name} bought ${
          products?.length
        } products for a total of ${currency(
          totalPrice
        )}. Your updated balance is ${currency(newBalance)}`;

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
          paymentMethod: "pgpay",
          channel: order?.channel,
          paymentId: order?.paymentId,
          platform: order?.platform,
          transactionType: "sales",
          userID: merchantId,
        };
        await createOrder(orderPayload);

        return orderPayload;
      })
    );

    // Order is paid, update order status
    const shopOrderPayload = {
      ...orderPayload,
      paymentStatus: "paid",
    };
    await createOrder(orderPayload);

    return res.json({
      shopOrders,
      customer: {},
      order: shopOrderPayload,
    });
  } catch (error) {
    const errorMessage =
      error?.data?.message || error?.message || "Internal server error";
    res.status(500).json({
      message: errorMessage,
    });
  }
};

export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
  .post(updateHandler);
