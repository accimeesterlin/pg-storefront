import nc from "next-connect";
import { getFrequentlyBoughtProducts } from "pages/api/queries/getProduct";


export const frequentlyBoughtProductHandler = async (req, res) => {
  try {
    const payload = req?.body;
    const frequentlyBoughtProducts: any = await getFrequentlyBoughtProducts(
      10,
      20
    );

    return res.json({
      ...frequentlyBoughtProducts,
      ...payload,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc().get(frequentlyBoughtProductHandler);
