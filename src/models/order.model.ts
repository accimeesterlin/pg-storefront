import User from "./user.model";

type Item = {
  product_img?: string;
  product_name?: string;
  product_price?: number;
  product_quantity?: number;
};

interface Order {
  user?: User;
  id?: string;
  tax?: number;
  items?: Item[];
  createdAt?: string;
  discount?: number;
  deliveredAt?: string;
  totalPrice?: number;
  isDelivered?: boolean;
  shippingAddress?: string;
  status?: string | "Pending" | "Processing" | "Delivered" | "Cancelled";
}

export default Order;
