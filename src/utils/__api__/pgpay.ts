import axios from 'axios';

const baseUrl = "https://devtopup.pgecom.com/api"

const api = axios.create({
  baseURL: baseUrl
});




export const createPGPayToken = async (payload): Promise<any> => {
  const response = await api({
    method: "PUT",
    url: "/pgpay/token",
    data: payload,
  });
  return response?.data;
};


export default { createPGPayToken };
