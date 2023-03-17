import nc from "next-connect";
import Joi from "joi";
import {
  getProductsBySlug,
} from "pages/api/queries/getProduct";
import { getReviewByProductId } from "pages/api/queries/getReview";
import { getImageByProductId } from "pages/api/queries/getImages";
import { getShopById } from "pages/api/queries/getShop";
import { getCategoryByProductId } from "pages/api/queries/getCategory";

export const querySchema = Joi.object({
  slug: Joi.string().required(),
});

export const findProductHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const slug = payload?.slug;
    const products = await getProductsBySlug(slug);
    const singleProduct = products[0];

    const shopId = singleProduct?.shopId;

    let reviews = [];
    let categories = [];
    let images = [];

    try {
      reviews = await getReviewByProductId(singleProduct?.id);
    } catch (error) {
      // No reviews
    }

    try {
      images = await getImageByProductId(singleProduct?.id);
    } catch (error) {
      // No reviews
    }

    try {
      categories = await getCategoryByProductId(singleProduct?.id);
    } catch (error) {
      // No reviews
    }
    const shop = await getShopById(shopId);

    singleProduct.reviews = reviews;
    singleProduct.shop = shop;
    singleProduct.images = images;
    singleProduct.categories = categories;

    return res.json(singleProduct);
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc().get(findProductHandler);
