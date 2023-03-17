import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Product from "@models/product.model";
import { db } from "../utils/authUtils";

const { PRODUCT_TABLE } = process.env;

export const createProduct = async (payload: Product) => {
  const currentTime = moment.utc(new Date()).format();
  const productId = payload?.id || uuidv4();

  const productPayload = {
    ...payload,
    id: productId,
    updatedAt: `${currentTime}`,
    createdAt: `${currentTime}`,
  };
  try {
    const params = {
      TableName: PRODUCT_TABLE,
      Item: productPayload,
    };
    await db.put(params).promise();
    return productPayload;
  } catch (error) {
    throw new Error(error?.message || "Create product failed");
    // console.log(error?.message || "Update product failed");
  }
};
