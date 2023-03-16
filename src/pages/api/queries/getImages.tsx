import isEmpty from "lodash.isempty";
import { db } from "../utils/authUtils";

const { IMAGE_TABLE } = process.env;

const imageTable = IMAGE_TABLE;

export const getImageById = async (id: string) => {
  const params = {
    TableName: imageTable,
    Key: {
      id,
    },
  };
  const user = await db.get(params).promise();
  return user.Item;
};

export const getImageByShopId = async (shopId: string) => {
  const params = {
    TableName: imageTable,
    IndexName: "byShopId",
    KeyConditionExpression: "#shopId = :shopId",
    ExpressionAttributeNames: { "#shopId": "shopId" },
    ExpressionAttributeValues: { ":shopId": shopId },
  };

  const product: any = await db.query(params).promise();

  const items = product?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getImageByProductId = async (productId: string) => {
  const params = {
    TableName: imageTable,
    IndexName: "byProductId",
    KeyConditionExpression: "#productId = :productId",
    ExpressionAttributeNames: { "#productId": "productId" },
    ExpressionAttributeValues: { ":productId": productId },
  };

  const product: any = await db.query(params).promise();

  const items = product?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getImageByCollectionId = async (collectionId: string) => {
  const params = {
    TableName: imageTable,
    IndexName: "byCollectionId",
    KeyConditionExpression: "#collectionId = :collectionId",
    ExpressionAttributeNames: { "#collectionId": "collectionId" },
    ExpressionAttributeValues: { ":collectionId": collectionId },
  };

  const product: any = await db.query(params).promise();

  const items = product?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};
