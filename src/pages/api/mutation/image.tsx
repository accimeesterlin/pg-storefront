import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Image from '@models/image.model';
import { db } from "../utils/authUtils";

const { IMAGE_TABLE } = process.env;

export const createImage = async (payload: Image) => {
  const currentTime = moment.utc(new Date()).format();
  const imageId = payload?.id || uuidv4();

  const imagePayload = {
    ...payload,
    id: imageId,
    updatedAt: `${currentTime}`,
    createdAt: `${currentTime}`,
  };
  try {
    const params = {
      TableName: IMAGE_TABLE,
      Item: imagePayload,
    };
    await db.put(params).promise();
    return imagePayload;
  } catch (error) {
    throw new Error(error?.message || "Create image failed");
    // console.log(error?.message || "Update image failed");
  }
};
