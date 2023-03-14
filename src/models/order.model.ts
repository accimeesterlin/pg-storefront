
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
  products?: string[];
  shippingRate?: number;
  paymentId?: string;
  channel?: string;
  totalPrice?: string;
  paymentMethod?: string;
  updatedAt?: string;
  createdAt?: string;
}

export default Order;
