import axios from "axios";
import Address from "models/address.model";

import { addressList } from "../../__server__/__db__/address/data";

const api = axios.create({
  baseURL: process.env.WEBSITE_ORIGIN,
});

const getAddressList = async (): Promise<Address[]> => {
  const response = await axios.get("/api/user/address");
  return response?.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const ids = addressList.map((item) => ({ params: { id: item.id } }));
    
  // const response = await axios.get("/api/address/address-ids");
  return ids;
};

const getAddress = async (id: string): Promise<Address> => {
  const response = await api.get(`/api/user/address/${id}`);
  return response?.data;
};

const createAddress = async (payload: any): Promise<Address> => {
  const response = await axios.post("/api/user/address", payload);
  return response?.data;
};

export default { getAddressList, getIds, getAddress, createAddress };
