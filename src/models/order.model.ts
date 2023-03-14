import Product from "./product.model";

interface Order {
  id?: string;
  description?: string;
  orderId?: string;
  sender?: string;
  status?: string;
  paymentStatus?: string;
  transactionType?: string;
  amount?: number;
  customerId?: string;
  quantity?: number;
  userID?: string;
  receiver?: string;
  platform?: string;
  operatorId?: string;
  redirectUrl?: string;
  shopId?: string;
  products?: Product[];
  shippingRate?: number;
  paymentId?: string;
  channel?: string;
  comparePrice?: number;
  shippingAddress?: string;
  totalPrice?: number;
  isDelivered?: boolean;
  deliveredAt?: string;
  paymentMethod?: string;
  updatedAt?: string;
  createdAt?: string;
}

export default Order;
