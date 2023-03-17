import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import moncash from "nodejs-moncash-sdk";
import { getAddressByUserId } from "../../../queries/getAddress";
import { getBalanceById } from "../../../queries/getBalance";
import { getOrderByUserId } from "../../../queries/getOrder";
import { authenticationMiddleware } from "../../../token/verify";
import { getTotalPrice } from "@utils/utils";
import { createOrder } from "pages/api/mutation/order";

const pgMerchantID = process.env.PLATFORM_MERCHANT_ID;

const MONCASH_CLIENT_ID = process.env.MONCASH_CLIENT_ID;
const MONCASH_SECRET = process.env.MONCASH_SECRET;

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
      status: "pending",
      paymentStatus: "pending",
      shippingStatus: "pending",
      products, // []
      channel: "web",
      shippingAddress: payload?.checkout?.address,
      amount,
      paymentId: orderId,
      shippingRate: 0,
      totalPrice: amount,
      paymentMethod: "moncash",
      quantity: products?.reduce((acc, item) => acc + item?.qty, 0),
      userID: user?.id,
      transactionType: "sales",
      successUrl: `${process.env.WEBSITE_ORIGIN}/api/payment/moncash/verify`,
      errorUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/moncash/verify`,
    };

    // Configure Mon Cash
    moncash.configure({
      mode: process.env.MONCASH_MODE || "sandbox",
      client_id: MONCASH_CLIENT_ID,
      client_secret: MONCASH_SECRET,
    });

    // const gdes = amount * 159.18;
    const gdes = amount * 159.18;

    if (gdes > 75000) {
      return res.status(500).json({
        message: "Mon Cash Error",
        error: "Amount is too high",
      });
    }

    console.log("Gdes: ", gdes);

    const moncashPayload = {
      // amount: `${gdes.toFixed(2)}`,
      amount: `${30}`,
      orderId,
    };

    console.log("Order Id: ", orderId);

    const paymentCreator = moncash.payment;

    // Create the Mon Cash Payment Redirect URL
    paymentCreator.create(moncashPayload, async function (error, data) {
      if (error) {
        // console.log(error);
        return res.status(500).json({
          message: error?.message || "Mon Cash Error",
          error,
        });
      }

      const order: any = await createOrder(orderPayload);
      const moncashRedirectUrl = paymentCreator.redirect_uri(data);
      return res.json({
        ...order,
        moncashRedirectUrl,
      });
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
