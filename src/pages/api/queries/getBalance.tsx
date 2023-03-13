import { db } from "../utils/authUtils";
import { fetchData } from "../utils/queryUtils";

const { BALANCE_TABLE_NAME } = process.env;

const balanceTable = BALANCE_TABLE_NAME;

const getBalanceById = async (id: string) => {
  try {
    const params = {
      TableName: balanceTable,
      Key: {
        id,
      },
    };
    const user = await db.get(params).promise();
    return user.Item;
  } catch (error) {
    throw new Error(`Error getting balance: ${error?.message}`);
  }
};

const getBalanceByUserId = async (userID: string) => {
  const params = {
    TableName: balanceTable,
    IndexName: "byUser",
    KeyConditionExpression: "#userID = :userID",
    ExpressionAttributeNames: { "#userID": "userID" },
    ExpressionAttributeValues: { ":userID": userID },
  };

  const items = await fetchData(params, "getBalanceByUserId");

  return items;
};

export { getBalanceByUserId, getBalanceById };
