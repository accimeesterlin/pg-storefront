import { updateItem } from "pages/api/utils/mutationUtils";

const { USER_TABLE } = process.env;

const userTable = USER_TABLE;

export const updateUser = async (payload: any) => {
  try {
    const userUpdated = await updateItem(userTable, payload);
    return userUpdated;
  } catch (error) {
    throw new Error(`updateUser ${error?.message}`);
  }
};
