import { updateItem } from "pages/api/utils/mutationUtils";

const { ADDRESS_TABLE } = process.env;

const addressTable = ADDRESS_TABLE;

export const updateAddress = async (payload: any) => {
  try {
    const addressUpdated = await updateItem(addressTable, payload);
    return addressUpdated;
  } catch (error) {
    throw new Error(`updateAddress ${error?.message}`);
  }
};
