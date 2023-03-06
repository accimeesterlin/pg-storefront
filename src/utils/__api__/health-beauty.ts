import Product from "models/product.model";
import { HealthCarouselItem } from "models/carousel.model";

import * as db from "../../__server__/__db__/health-beauty/data";

const products = db.products.filter((item) => item.for.type === "all-products");
const topProducts = db.products.filter((item) => item.for.type === "top-new-products");


const getNavigation = async () => {
  // const response = await axios.get("/api/health-beauty/navigation");
  return db.categoryNavigation;
};

const getTopNewProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/health-beauty/products?tag=new");
  return topProducts;
};

const getProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/health-beauty/products");
  return products;
};

const getServices = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/health-beauty/services");
  return db.serviceList;
};

const getMainCarousel = async (): Promise<HealthCarouselItem[]> => {
  // const response = await axios.get("/api/health-beauty/main-carousel");
  return db.mainCarouselData;
};

export default { getProducts, getServices, getNavigation, getTopNewProducts, getMainCarousel };
