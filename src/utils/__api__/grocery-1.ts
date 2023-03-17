import Product from "models/product.model";
import Service from "models/service.model";

import * as db from "../../__server__/__db__/grocery-1/data";

const getProductsData = (type: string) => {
  return db.products.filter((item) => item.for.type === type);
};

const getGrocery1Navigation = async () => {
  // const response = await axios.get("/api/grocery-1/navigation");
  return db.categoryNavigation
};

const getPopularProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/grocery-1/products?tag=popular");
  return getProductsData("popular-products");
};

const getTrendingProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/grocery-1/products?tag=trending");
  return getProductsData("trending-products")
};

const getProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/grocery-1/products");
  return getProductsData("all-products")
};

const getServices = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/grocery-1/services");
  return db.serviceList;
};

export default {
  getServices,
  getProducts,
  getPopularProducts,
  getTrendingProducts,
  getGrocery1Navigation,
};
