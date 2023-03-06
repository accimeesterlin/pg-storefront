import { OfferCard } from "models/grocery-3.model";
import Product from "models/product.model";

import * as db from "../../__server__/__db__/grocery-3/data";

const products = db.products.filter((item) => item.for.type === "all-products");
const topProducts = db.products.filter((item) => item.for.type === "top-saled-products");


const getTopSailedProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/grocery-3/products?tag=top-sailed");
  return topProducts;
};

const getAllProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/grocery-3/products");
  return products;
};

const getOfferCards = async (): Promise<OfferCard[]> => {
  // const response = await axios.get("/api/grocery-3/products?tag=offer");
  return db.discountOffers;
};

const getMainCarousel = async () => {
  // const response = await axios.get("/api/grocery-3/main-carousel");
  return  db.mainCarouselData;
};

export default {
  getOfferCards,
  getAllProducts,
  getMainCarousel,
  getTopSailedProducts,
};
