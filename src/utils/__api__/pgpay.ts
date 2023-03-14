import axios from 'axios';





export const createPGPayToken = async (payload): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: "/api/user/payment/pgpay/createsession",
    data: payload,
  });
  return response?.data;
};


export default { createPGPayToken };
