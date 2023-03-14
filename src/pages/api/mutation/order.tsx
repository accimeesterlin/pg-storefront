import Order from "@models/order.model";
import { updateItem } from "pages/api/utils/mutationUtils";

const { ORDER_TABLE } = process.env;

const orderTable = ORDER_TABLE;

export const createOrder = async (payload: Order) => {
  try {
    const orderUpdated = await updateItem(orderTable, payload);
    return orderUpdated;
  } catch (error) {
    throw new Error(`createOrder ${error?.message}`);
  }
};
