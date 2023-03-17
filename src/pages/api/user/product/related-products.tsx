import nc from "next-connect";
import Joi from "joi";
import { getRelatedProducts } from "pages/api/queries/getProduct";
import { getCategoryByProductId } from "pages/api/queries/getCategory";

export const querySchema = Joi.object({
  productId: Joi.string().required(),
});

export const relatedProductHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const productId = payload?.productId;

    let categories = [];

    try {
      categories = await getCategoryByProductId(productId);
    } catch (error) {
      // No categories
    }

    const relatedProducts: any = await getRelatedProducts(
      productId,
      categories
    );

    return res.json(relatedProducts);
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc().get(relatedProductHandler);
