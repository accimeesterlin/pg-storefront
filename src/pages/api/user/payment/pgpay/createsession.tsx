import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getAddressByUserId } from "../../../queries/getAddress";
import { getBalanceById } from "../../../queries/getBalance";
import { getOrderByUserId } from "../../../queries/getOrder";
import { authenticationMiddleware } from "../../../token/verify";
import { currency, getTotalPrice } from "@utils/utils";
import { createOrder } from "pages/api/mutation/order";

const baseUrl = "http://localhost:3002";
// const baseUrl = "https://sandbox.pgecom.com";
const baseOriginUrl = process.env.WEBSITE_ORIGIN;
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
      company: Joi.string().required(),
      street: Joi.string().required(),
      apartment: Joi.string().allow(null, ""),
      city: Joi.string().allow(null, ""), // TODO: make this required
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

const updateHandler = async (req, res) => {
  try {
    const payload = await payloadSchema.validateAsync(req?.body);
    const user: User = req?.tokenData?.user;

    const customerId = user?.id;

    const orderId = uuidv4();
    const amount = getTotalPrice(payload?.cart);

    const orderPayload = {
      id: orderId,
      orderId,
      customerId,
      sender: user?.email,
      platform: "marketplace",
      status: "pending",
      paymentStatus: "pending",
      products: payload?.cart, // []
      channel: "web",
      amount,
      paymentId: orderId,
      shippingRate: 0,
      totalPrice: amount,
      paymentMethod: "pgpay",
      quantity: payload?.cart?.reduce((acc, item) => acc + item?.qty, 0),
      userID: user?.id,
      transactionType: "sales",
    };

    await createOrder(orderPayload)

    const pgPayload = {
      userID: pgMerchantID,
      orderId,
      amount,
      phone: user?.phone,
      transactionType: "sales",
      description: `You bought ${payload?.cart?.length} items on PGecom Marketplace for a total of ${currency(amount)}`,
      redirectUrl: `${baseOriginUrl}/api/user/payment/pgpay/verify`,
    };
    const response = await axios({
      method: "post",
      url: `${baseUrl}/api/pgpay/token`,
      data: pgPayload,
    });

    const data = response?.data;
    return res.json(data);
  } catch (error) {
    const errorMessage = error?.data?.message || error?.message || "Internal server error";
    res.status(500).json({
      message: errorMessage,
    });
  }
};

export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
  .post(updateHandler);
