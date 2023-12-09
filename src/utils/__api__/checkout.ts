import Shop from '@models/shop.model';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

export const createCheckoutSession = async (payload): Promise<any> => {

  const checkout = payload?.checkout;
  const cart = payload?.cart || [];

  const shop: Shop = payload?.shop;
  const paymentMethod: string = payload?.paymentMethod || "moncash";

  const merchantId = payload?.merchantId;

  const shippingAddress = checkout?.address;
  const billingAddress = checkout?.billingAddress;

  const monCashPayload = {
    merchantId,
    shopId: shop?.id,
    paymentMethod,
    customer: {
      name: shippingAddress?.name,
      email: shippingAddress?.email,
      phone: shippingAddress?.phone,
    },
    shippingAddress,
    billingAddress,

    products: cart?.map((item) => ({
      name: item?.name,
      shopId: shop?.id,
      description: item?.description,
      quantity: item?.quantity,
      price: item?.price,
    })),
    currency: "usd",
  }


  const response = await api.post("/checkout", monCashPayload);
  return response?.data;
};


export default { createCheckoutSession };
