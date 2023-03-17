import Product from "models/product.model";
import CategoryNavList from "models/categoryNavList.model";
import { FurnitureCarouselItem } from "models/carousel.model";

import * as db from "../../__server__/__db__/furniture/data";

const getTopNewProducts = async (): Promise<Product[]> => {
  const newProducts = db.products.filter((item) => item.for.type === "top-new-product");

  // const response = await axios.get("/api/furniture-shop/products?tag=new");
  return newProducts;
};

const getTopSellingProducts = async (): Promise<Product[]> => {
  const sellingProducts = db.products.filter((item) => item.for.type === "top-selling-product");

  // const response = await axios.get("/api/furniture-shop/products?tag=top-selling");
  return sellingProducts;
};

const getFurnitureProducts = async (): Promise<Product[]> => {
  const allProducts = db.products.filter((item) => item.for.type === "all-product");

  // const response = await axios.get("/api/furniture-shop/all-products");
  return allProducts;
};

const getFurnitureShopNavList = async (): Promise<CategoryNavList[]> => {
  // const response = await axios.get("/api/furniture-shop/navigation");
  return  db.categoryNavigation;
};

const getMainCarouselData = async (): Promise<FurnitureCarouselItem[]> => {
  // const response = await axios.get("/api/furniture-shop/main-carousel");
  return db.mainCarouselData;
};

export default {
  getTopNewProducts,
  getMainCarouselData,
  getFurnitureProducts,
  getTopSellingProducts,
  getFurnitureShopNavList,
};
