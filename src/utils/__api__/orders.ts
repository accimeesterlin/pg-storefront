import axios from "axios";
import Order from "@models/order.model";

import { orders } from "../../__server__/__db__/orders/data";

const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get("/api/user/order");
  return response?.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  // const response = await axios.get("/api/users/order-ids");
  const ids = orders.map((item) => ({ params: { id: item.id } }));
  return ids;
};

const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get(`/api/user/order/${id}`, { params: { id } });
  return response?.data;;
};

export default { getOrders, getOrder, getIds };
