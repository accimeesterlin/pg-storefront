import isEmpty from "lodash.isempty";
import { db } from "../utils/authUtils";

const { REVIEW_TABLE } = process.env;

const reviewTable = REVIEW_TABLE;

export const getReview = async (id: string) => {
  const params = {
    TableName: reviewTable,
    Key: {
      id,
    },
  };
  const user = await db.get(params).promise();
  return user.Item;
};

export const getReviewByShopId = async (shopId: string) => {
  const params = {
    TableName: reviewTable,
    IndexName: "byShopId",
    KeyConditionExpression: "#shopId = :shopId",
    ExpressionAttributeNames: { "#shopId": "shopId" },
    ExpressionAttributeValues: { ":shopId": shopId },
  };

  const review: any = await db.query(params).promise();

  const items = review?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getReviewByCustomer = async (customerId: string) => {
  const params = {
    TableName: reviewTable,
    IndexName: "byCustomerId",
    KeyConditionExpression: "#customerId = :customerId",
    ExpressionAttributeNames: { "#customerId": "customerId" },
    ExpressionAttributeValues: { ":customerId": customerId },
  };

  const review: any = await db.query(params).promise();

  const items = review?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getReviewByProductId = async (byProductId: string) => {
  const params = {
    TableName: reviewTable,
    IndexName: "byProductId",
    KeyConditionExpression: "#byProductId = :byProductId",
    ExpressionAttributeNames: { "#byProductId": "byProductId" },
    ExpressionAttributeValues: { ":byProductId": byProductId },
  };

  const review: any = await db.query(params).promise();

  const items = review?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};
