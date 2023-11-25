import Shop from '@models/shop.model';
import { convertUsdToGdes } from '@utils/utils';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
  baseURL: `${API_URL}/api/moncash`,
});

export const createMonCashSession = async (payload): Promise<any> => {

  const checkout = payload?.checkout;
  const cart = payload?.cart;

  const totalPrice = payload?.totalPrice;
  const exchangeAmount = payload?.exchangeAmount;
  const shop: Shop = payload?.shop;

  const merchantId = shop?.user?.id;
  const { totalAmount } = convertUsdToGdes({ amount: totalPrice, exchangeAmount });

  const monCashPayload = {
    // Required
    gdes: totalAmount,
    userID: merchantId,

    // Optional
    description: "",
    referenceId: "",
    // TODO: Add success and error urls
    successUrl: "",
    errorUrl: "",
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",

    metadata: {
      shop,
      checkout,
      totalPrice,
      cart,
    },
  }


  const response = await api.post("/pgmoncashtoken", monCashPayload);
  return response?.data;
};


export default { createMonCashSession };
