// import axios from "axios";
import Address from "models/address.model";

import { addressList } from "../../__server__/__db__/address/data";

const getAddressList = async (): Promise<Address[]> => {
  // const response = await axios.get("/api/address/user");
  return addressList;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const ids = addressList.map((item) => ({ params: { id: item.id } }));
    
  // const response = await axios.get("/api/address/address-ids");
  return ids;
};

const getAddress = async (id: string): Promise<Address> => {
  const address = addressList.find((item) => item.id === id);
      
  // const response = await axios.get("/api/address/user/1", { params: { id } });
  return address;
};

export default { getAddressList, getIds, getAddress };
