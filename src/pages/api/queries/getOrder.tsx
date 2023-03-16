import { db } from "../utils/authUtils";
import { fetchData } from "../utils/queryUtils";

const { ORDER_TABLE } = process.env;

const orderTable = ORDER_TABLE;

const getOrderById = async (id: string) => {
  try {
    const params = {
      TableName: orderTable,
      Key: {
        id,
      },
    };
    const user = await db.get(params).promise();
    return user.Item;
  } catch (error) {
    throw new Error(`Error getting order: ${error?.message}`);
  }
};

const getOrderBySender = async (sender: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "bySender",
    KeyConditionExpression: "#sender = :sender",
    ExpressionAttributeNames: { "#sender": "sender" },
    ExpressionAttributeValues: { ":sender": sender },
  };

  const items = await fetchData(params, "getOrderBySender");

  return items;
};

const getOrders = async () => {
  const params = {
    TableName: orderTable,
    Limit: 50,
  };

  const items = await fetchData(params, "getUserList");

  return items;
};


const getOrderByPhone = async (phone: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byPhone",
    KeyConditionExpression: "#phone = :phone",
    ExpressionAttributeNames: { "#phone": "phone" },
    ExpressionAttributeValues: { ":phone": phone },
  };

  const items = await fetchData(params, "getOrderByPhone");

  return items;
};

const getOrderByShopId = async (shopId: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byShopId",
    KeyConditionExpression: "#shopId = :shopId",
    ExpressionAttributeNames: { "#shopId": "shopId" },
    ExpressionAttributeValues: { ":shopId": shopId },
  };

  const items = await fetchData(params, "getOrderByShopId");

  return items;
};

const getOrderByCustomerId = async (customerId: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byCustomerID",
    KeyConditionExpression: "#customerId = :customerId",
    ExpressionAttributeNames: { "#customerId": "customerId" },
    ExpressionAttributeValues: { ":customerId": customerId },
  };

  const items = await fetchData(params, "getOrderByCustomerId");

  return items;
};

const getOrderByStatus = async (status: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byStatus",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: { ":status": status },
  };

  const items = await fetchData(params, "getOrderByStatus");

  return items;
};

const getOrderByPlatform = async (platform: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byPlatform",
    KeyConditionExpression: "#platform = :platform",
    ExpressionAttributeNames: { "#platform": "platform" },
    ExpressionAttributeValues: { ":platform": platform },
  };

  const items = await fetchData(params, "getOrderByPlatform");

  return items;
};

const getOrderByUserId = async (userID: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byUser",
    KeyConditionExpression: "#userID = :userID",
    ScanIndexForward: false,
    ExpressionAttributeNames: { "#userID": "userID", "#transactionType": "transactionType" },
    ExpressionAttributeValues: { ":userID": userID, ":transactionType": "sales" },
    FilterExpression: "#transactionType = :transactionType",
  };

  const items = await fetchData(params, "getOrderByPlatform");

  return items;
};

const getOrderByOrderId = async (orderId: string) => {
  const params = {
    TableName: orderTable,
    IndexName: "byOrderId",
    KeyConditionExpression: "#orderId = :orderId",
    ScanIndexForward: false,
    ExpressionAttributeNames: { "#orderId": "orderId", "#transactionType": "transactionType" },
    ExpressionAttributeValues: { ":orderId": orderId, ":transactionType": "sales" },
    FilterExpression: "#transactionType = :transactionType",
  };

  const items = await fetchData(params, "getOrderByPlatform");

  return items[0];
};

// Define a function to check if a customer has already purchased a product
const hasCustomerPurchasedProduct = async (customerId, productId) => {
  try {
    // Query the Orders table for orders that match the customer ID and the product ID
    const params = {
      TableName: orderTable,
      IndexName: 'byCustomerId',
      KeyConditionExpression: 'customerId = :customerId',
      FilterExpression: 'contains(products, :productId)',
      ExpressionAttributeValues: {
        ':customerId': { S: customerId },
        ':productId': { S: productId }
      },
      ProjectionExpression: 'id'
    }
    const items = await fetchData(params, "hasCustomerPurchasedProduct");

    // Return true if any orders were found, false otherwise
    return items.Count > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export {
  getOrderBySender,
  getOrderByPhone,
  getOrderById,
  getOrders,
  getOrderByShopId,
  getOrderByCustomerId,
  getOrderByStatus,
  getOrderByPlatform,
  getOrderByUserId,
  getOrderByOrderId,
  hasCustomerPurchasedProduct
};
