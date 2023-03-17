import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";

import { getOrderByUserId } from "../../queries/getOrder";
import { authenticationMiddleware } from "../../token/verify";
import Order from "@models/order.model";
// import { updateUser } from "../../mutation/user";

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    const orders: Order[] = await getOrderByUserId(userID)

    return res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

// Define schema for customer
export const payloadSchema = Joi.object({
  firstName: Joi.string().allow(null, ""),
  lastName: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  birthDay: Joi.string().allow(null, ""),
  file: Joi.string().allow(null, ""),
});

const updateHandler = async (req, res) => {
  try {
    const payload = await payloadSchema.validateAsync(req?.body);

    return res.json({
      ...payload,
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
  .put(updateHandler);
