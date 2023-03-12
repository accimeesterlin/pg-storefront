import moment from "moment";
import uuid from "uuid";
import { db } from "./authUtils";

export const updateItem = async (tableName: string, payload: any) => {
  const currentTime = moment.utc(new Date()).format();
  const id = payload?.id || uuid.v4();

  const itemPayload = {
    ...payload,
    id,
    updatedAt: `${currentTime}`,
    createdAt: payload?.createdAt || `${currentTime}`,
  };
  try {
    const params = {
      TableName: tableName,
      Item: itemPayload,
    };
    const itemUpdated = await db.put(params).promise();
    return itemUpdated;
  } catch (error) {
    throw new Error(`${tableName} ${error?.message}`);
  }
};
