import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Review from "@models/Review.model";
import { db } from "../utils/authUtils";

const { REVIEW_TABLE } = process.env;

export const createReview = async (payload: Review) => {
  const currentTime = moment.utc(new Date()).format();
  const reviewId = uuidv4();

  const reviewPayload = {
    ...payload,
    id: reviewId,
    updatedAt: `${currentTime}`,
    createdAt: `${currentTime}`,
  };
  try {
    const params = {
      TableName: REVIEW_TABLE,
      Item: reviewPayload,
    };
    await db.put(params).promise();
    return reviewPayload;
  } catch (error) {
    throw new Error(error?.message || "Create review failed");
    // console.log(error?.message || "Update review failed");
  }
};
