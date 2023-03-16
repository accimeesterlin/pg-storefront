import { db } from "../utils/authUtils";
import { fetchData } from "../utils/queryUtils";

const { SHOP_TABLE } = process.env;

const shopTable = SHOP_TABLE;

export const getShopById = async (id: string) => {
  try {
    const params = {
      TableName: shopTable,
      Key: {
        id,
      },
    };
    const user = await db.get(params).promise();
    return user.Item;
  } catch (error) {
    throw new Error(
      `Error getting shop ${error?.message}` || "Get shop staff failed"
    );
  }
};

export const getShopBySlug = async (slug: string) => {
  const params = {
    TableName: shopTable,
    IndexName: "byShopSlug",
    KeyConditionExpression: "#slug = :slug",
    ExpressionAttributeNames: { "#slug": "slug" },
    ExpressionAttributeValues: { ":slug": slug, ":verified": true },
    FilterExpression: "verified = :verified",
  };
  const items = await fetchData(params, "getShopBySlug");
  return items;
};

export const getShopByName = async (name: string) => {
  const params = {
    TableName: shopTable,
    IndexName: "byShopName",
    KeyConditionExpression: "#name = :name",
    ExpressionAttributeNames: { "#name": "name" },
    ExpressionAttributeValues: { ":name": name, ":published": true },
    FilterExpression: "published = :published",
  };
  const items = await fetchData(params, "getShopByName");
  return items;
};

export const getLatestShops = async () => {
  try {
    const params = {
      TableName: SHOP_TABLE,
      Limit: 15,
      ScanIndexForward: false, // Sort in descending order
      IndexName: "byCreatedAt", // Use the secondary index for createdAt
      FilterExpression: "verified = :verified",
      ExpressionAttributeValues: { ":verified": true },
    };
  
    const shops = await db.scan(params).promise();
    return shops?.Items;
  } catch (error) {
    return [];
  }
};

export const getTotalShopCount = async () => {
  try {
    const params = {
      TableName: SHOP_TABLE,
      Select: "COUNT",
    };
    const result = await db.scan(params).promise();
    return result.Count;
  } catch (error) {
    return null;
  }
};

export const getShopByMerchantId = async (merchantId: string) => {
  const params = {
    TableName: shopTable,
    IndexName: "byMerchantId",
    KeyConditionExpression: "#merchantId = :merchantId",
    ExpressionAttributeNames: { "#merchantId": "merchantId" },
    ExpressionAttributeValues: { ":merchantId": merchantId },
  };
  const items = await fetchData(params, "getShopByMerchantId");
  return items;
};
