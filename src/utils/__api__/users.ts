import axios from 'axios';
import { Auth } from "aws-amplify";
import User from "models/user.model";

import { users } from "../../__server__/__db__/users/data";

export const getAccessToken = async () => {
  try {
    const session = await Auth.currentSession();
    const accessToken = session.getAccessToken().getJwtToken();
    return accessToken;
  } catch (error) {
    console.log('Error getting access token:', error);
  }
};

const API_URL = process.env.NEXT_PUBLIC_SELLER_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getAccessToken()
  },
});

export const getUser = async (): Promise<User[]> => {
  // const response = await axios.get("/api/user-list/1");
  return users;
};

export const getUserIds = async (): Promise<{ params: { id: string } }[]> => {
  // const response = await axios.get("/api/user-list/id-list");
  const idList = users.map((item) => ({ params: { id: item.id } }));
    
  return idList;
};

export const getUserToken = async (payload): Promise<any> => {
  const response = await api.post("/api/token/issue", payload);
    
  return response?.data;
};



export default { getUser, getUserIds, getUserToken };
