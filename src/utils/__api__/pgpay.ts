import axios from 'axios';


export const createPGPayPayment = async (payload): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: "/api/user/payment/pgpay",
    data: payload,
  });
  return response?.data;
};


export default { createPGPayPayment };
