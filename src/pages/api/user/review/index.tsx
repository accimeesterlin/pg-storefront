import nc from "next-connect";
import Joi from "joi";
import { getReview } from "pages/api/queries/getReview";
import { createReview } from "pages/api/mutation/review";


// Define schema for review
export const reviewSchema = Joi.object({
  // Required
  productId: Joi.string().required(),
  customerId: Joi.string().required(),
  rating: Joi.number().required(),
  text: Joi.string().required(),
});

export const reviewHandler = async (req, res) => {
  try {
    const payload = await reviewSchema.validateAsync(req?.body);

    const review = await createReview(payload);

    return res.json(review);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export const querySchema = Joi.object({
  id: Joi.string().required(),
});

export const findReviewHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const id = payload?.id;
    const review = await getReview(id);

    return res.json(review);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc().post(reviewHandler).get(findReviewHandler);
