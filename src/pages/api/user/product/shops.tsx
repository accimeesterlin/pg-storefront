import nc from "next-connect";
import { getLatestProducts, getProductByShopId } from "pages/api/queries/getProduct";


console.log("PID: ", process.pid);

export const findProductHandler = async (req, res) => {
  try {
    const query = req?.query;
    const shops: any = await getLatestProducts();

    const products = await Promise.all(
      shops.map(async (shop) => {
        const shopId = shop?.id;

        let productList = [];

        try {
          productList = await getProductByShopId(shopId);
        } catch (error) {
          // No product
          console.log("Error: ", error);
        }

        return {
          ...shop,
          products: productList,
        };
      })
    );

    return res.json({
      products,
      ...query
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc().get(findProductHandler);
