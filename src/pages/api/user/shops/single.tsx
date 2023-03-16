import nc from "next-connect";
import Joi from "joi";
import { getShopBySlug } from "pages/api/queries/getShop";
import { getProductByShopId } from "pages/api/queries/getProduct";

export const querySchema = Joi.object({
  slug: Joi.string().required(),
});

export const findShopHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const slug = payload?.slug;

    const shops = await getShopBySlug(slug);
    const singleshop = shops[0];

    const shopId = singleshop?.id;

    const products = await getProductByShopId(shopId);

    singleshop.products = products;

    return res.json(singleshop);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc({ attachParams: true })
  .get(findShopHandler);
