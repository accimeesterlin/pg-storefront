import isEmpty from "lodash.isempty";
import { db } from "../utils/authUtils";

const { CATEGORY_TABLE } = process.env;

const categoryTable = CATEGORY_TABLE;

export const getCategory = async (id: string) => {
  try {
    const params = {
      TableName: categoryTable,
      Key: {
        id,
      },
    };
    const user = await db.get(params).promise();
    return user.Item;
  } catch (error) {
    // console.log(error?.message || "Get user category failed");
  }
};

export const getCategoryByShopId = async (shopId: string) => {
  const params = {
    TableName: categoryTable,
    IndexName: "byShopId",
    KeyConditionExpression: "#shopId = :shopId",
    ExpressionAttributeNames: { "#shopId": "shopId" },
    ExpressionAttributeValues: { ":shopId": shopId },
  };

  const category: any = await db.query(params).promise();

  const items = category?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getCategoryByProductId = async (productId: string) => {
  const params = {
    TableName: categoryTable,
    IndexName: "byProductId",
    KeyConditionExpression: "#productId = :productId",
    ExpressionAttributeNames: { "#productId": "productId" },
    ExpressionAttributeValues: { ":productId": productId },
  };

  const category: any = await db.query(params).promise();

  const items = category?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};
