import Order from "@models/order.model";

import { orders } from "../../__server__/__db__/orders/data";

const getOrders = async (): Promise<Order[]> => {
  // const response = await axios.get("/api/users/orders");
  return orders;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  // const response = await axios.get("/api/users/order-ids");
  const ids = orders.map((item) => ({ params: { id: item.id } }));
  return ids;
};

const getOrder = async (id: string): Promise<Order> => {
  // const response = await axios.get("/api/users/order", { params: { id } });
  const order = orders.find((item) => item.id === id);
  return order;
};

export default { getOrders, getOrder, getIds };
