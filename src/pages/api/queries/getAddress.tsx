import { db } from "../utils/authUtils";
import { fetchData } from "../utils/queryUtils";

const { ADDRESS_TABLE } = process.env;

const addressTable = ADDRESS_TABLE;

const getAddressById = async (id: string) => {
  try {
    const params = {
      TableName: addressTable,
      Key: {
        id,
      },
    };
    const user = await db.get(params).promise();
    return user.Item;
  } catch (error) {
    throw new Error(`Error getting user: ${error?.message}`);
  }
};

const getAddressByUserId = async (userID: string) => {
  const params = {
    TableName: addressTable,
    IndexName: "byUser",
    KeyConditionExpression: "#userID = :userID",
    ExpressionAttributeNames: { "#userID": "userID" },
    ExpressionAttributeValues: { ":userID": userID },
  };

  const items = await fetchData(params, "getAddressByUserId");

  return items;
};

export { getAddressById, getAddressByUserId };
