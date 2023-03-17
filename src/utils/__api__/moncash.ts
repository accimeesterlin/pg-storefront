import axios from 'axios';


export const createMonCashSession = async (payload): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: "/api/user/payment/moncash/token",
    data: payload,
  });
  return response?.data;
};


export default { createMonCashSession };
