import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Shop from "@models/shop.model";
import { db } from "../utils/authUtils";

const { SHOP_TABLE } = process.env;

export const createShop = async (payload: Shop) => {
  const currentTime = moment.utc(new Date()).format();
  const shopId = payload?.id || uuidv4();

  const shopPayload = {
    ...payload,
    id: shopId,
    updatedAt: `${currentTime}`,
    createdAt: `${currentTime}`,
  };
  try {
    const params = {
      TableName: SHOP_TABLE,
      Item: shopPayload,
    };
    const bankUpdated = await db.put(params).promise();
    return bankUpdated;
  } catch (error) {
    // console.log(error?.message || "Update bank failed");
  }
};
