import nc from "next-connect";
import { getOrderByOrderId } from "../../queries/getOrder";
import { authenticationMiddleware } from "../../token/verify";
import Order from "@models/order.model";

const getHandler = async (req, res) => {
  try {
    const orderId = req?.query?.id;
    const order: Order = await getOrderByOrderId(orderId)

    return res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};


export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
