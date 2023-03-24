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
    // console.log('Error getting access token:', error);
  }
};

const api = axios.create({
  baseURL: process.env.WEBSITE_ORIGIN,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getUser = async (): Promise<User[]> => {
  // const response = await axios.get("/api/user-list/1");
  return users;
};


export const getMe = async (): Promise<User> => {
  const response = await api.get("/api/user/me");
  return response?.data;
};

export const updateMe = async (payload): Promise<User> => {
  const response = await api({
    method: "PUT",
    url: "/api/user/me",
    data: payload,

    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};


export const getUserIds = async (): Promise<{ params: { id: string } }[]> => {
  // const response = await axios.get("/api/user-list/id-list");
  const idList = users.map((item) => ({ params: { id: item.id } }));
    
  return idList;
};

export const setUserToken = async (token): Promise<any> => {
  const response = await api.post("/api/token/issue", { token });
    
  return response?.data;
};


export const getUserSession = async (): Promise<any> => {
  const response = await api.get("/api/token/session");
    
  return response?.data;
};

export default { getUser, getUserIds, setUserToken, getAccessToken, getMe, updateMe, getUserSession };
