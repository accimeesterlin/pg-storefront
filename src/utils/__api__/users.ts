import User from "models/user.model";

import { users } from "../../__server__/__db__/users/data";

export const getUser = async (): Promise<User[]> => {
  // const response = await axios.get("/api/user-list/1");
  return users;
};

export const getUserIds = async (): Promise<{ params: { id: string } }[]> => {
  // const response = await axios.get("/api/user-list/id-list");
  const idList = users.map((item) => ({ params: { id: item.id } }));
    
  return idList;
};

export default { getUser, getUserIds };
