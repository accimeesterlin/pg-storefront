import isEmpty from "lodash.isempty";
import { db } from "../utils/authUtils";

const { PRODUCT_TABLE } = process.env;

const productTable = PRODUCT_TABLE;

export const getProductById = async (id: string) => {
  const params = {
    TableName: productTable,
    Key: {
      id,
    },
  };
  const user = await db.get(params).promise();
  return user.Item;
};

export const getProductByShopId = async (shopId: string) => {
  const params = {
    TableName: productTable,
    IndexName: "byShopId",
    KeyConditionExpression: "#shopId = :shopId",
    ExpressionAttributeNames: {
      "#shopId": "shopId",
      "#status": "status",
    },
    FilterExpression: "published = :published AND #status = :status",
    ExpressionAttributeValues: {
      ":shopId": shopId,
      ":status": "active",
      ":published": true,
    },
  };

  const product: any = await db.query(params).promise();

  const items = product?.Items;

  if (isEmpty(items)) {
    return [];
  }

  return items;
};

export const getProductsBySlug = async (slug: string) => {
  try {
    const params = {
      TableName: productTable,
      IndexName: "bySlug",
      KeyConditionExpression: "#slug = :slug",
      ExpressionAttributeNames: { "#slug": "slug", "#status": "status" },
      FilterExpression: "published = :published AND #status = :status",
      ExpressionAttributeValues: {
        ":slug": slug,
        ":status": "active",
        ":published": true,
      },
    };

    const product: any = await db.query(params).promise();

    const items = product?.Items;

    if (isEmpty(items)) {
      return [];
    }

    return items;
  } catch (error) {
    throw new Error(`Error getting product by slug: ${error.message}`);
  }
};

export const getLatestProducts = async () => {
  const params = {
    TableName: productTable,
    Limit: 15,
    ScanIndexForward: false, // Sort in descending order
    IndexName: "byCreatedAt", // Use the secondary index for createdAt
    ExpressionAttributeNames: { "#status": "status" },
    FilterExpression: "published = :published AND #status = :status",
    ExpressionAttributeValues: {
      ":published": true,
      ":status": "active",
    },
  };

  const products = await db.scan(params).promise();
  return products?.Items;
};

export const getRelatedProducts = async (productId, categories) => {
  const params: any = {
    TableName: PRODUCT_TABLE,
    IndexName: "byCategoryId",
    KeyConditionExpression: "id <> :productId",
    FilterExpression: "contains (:categories, category)",
    ExpressionAttributeValues: {
      // ":category": categories[0], // Assumes only one category for simplicity
      ":categories": categories,
      ":productId": productId,
    },
    ProjectionExpression: "id, price, images",
  };

  if (categories?.length > 0) {
    const [category] = categories;
    params.ExpressionAttributeValues[":category"] = category;
    params.KeyConditionExpression = "category = :category AND id <> :productId";
  }

  const products = await db.query(params).promise();
  return products?.Items;
};

export const getFrequentlyBoughtProducts = async (
  numProducts,
  minOrderCount
) => {
  try {
    const ordersParams = {
      TableName: process.env.ORDER_TABLE,
      ProjectionExpression: "id, products",
    };
    const ordersResult = await db.scan(ordersParams).promise();
    const orderItems = ordersResult.Items;

    // Count the number of times each product appears in all orders
    const productCounts = {};
    orderItems.forEach((order) => {
      order.products.forEach((product) => {
        if (product.id in productCounts) {
          productCounts[product.id] += 1;
        } else {
          productCounts[product.id] = 1;
        }
      });
    });

    // Find the most frequently bought products
    const topProducts = Object.entries(productCounts)
      .filter(([, count]) => count >= minOrderCount)
      .sort((a: any[], b: any[]) => b[1] - a[1])
      .slice(0, numProducts);

    // Get the details of the top products
    const getProductParams = {
      RequestItems: {
        [PRODUCT_TABLE]: {
          Keys: topProducts.map(([productId]) => ({ id: productId })),
          ExpressionAttributeNames: {
            "#n": "name",
            "#p": "price",
          },
          ProjectionExpression: "#n, #p",
        },
      },
    };
    const productResult = await db.batchGet(getProductParams).promise();
    const products = productResult.Responses.Products;

    return topProducts.map(([productId, count]) => ({
      id: productId,
      count,
      name: products.find((product) => product.id === productId).name,
      price: products.find((product) => product.id === productId).price,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get frequently bought products");
  }
};
