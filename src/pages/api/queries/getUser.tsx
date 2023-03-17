import { db } from "../utils/authUtils";
import { fetchData } from "../utils/queryUtils";

const { USER_TABLE } = process.env;

const userTable = USER_TABLE;

const getUserById = async (id: string) => {
  try {
    const params = {
      TableName: userTable,
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

const getUserByEmail = async (email: string) => {
  const params = {
    TableName: userTable,
    IndexName: "byEmail",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: { "#email": "email" },
    ExpressionAttributeValues: { ":email": email },
  };

  const items = await fetchData(params, "getUserByEmail");

  return items;
};

const getUserList = async () => {
  const params = {
    TableName: userTable,
    Limit: 50,
  };

  const items = await fetchData(params, "getUserList");

  return items;
};

const getUserByPhone = async (phone: string) => {
  const params = {
    TableName: userTable,
    IndexName: "byPhone",
    KeyConditionExpression: "#phone = :phone",
    ExpressionAttributeNames: { "#phone": "phone" },
    ExpressionAttributeValues: { ":phone": phone },
  };

  const items = await fetchData(params, "getUserByPhone");

  return items;
};

export { getUserById, getUserByEmail, getUserList, getUserByPhone };
