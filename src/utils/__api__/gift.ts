import Product from "models/product.model";
import Service from "models/service.model";
import Category from "models/category.model";
import { GiftCarouselItem } from "models/carousel.model";
import CategoryNavList from "models/categoryNavList.model";

import * as db from "../../__server__/__db__/gift/data";

const getProducts = (type: string) => db.products.filter((item) => item.for.type === type);
const allProducts = getProducts("all-products");
const popularProducts = getProducts("popular-items");
const topSailedProducts = getProducts("top-saled-items");


const getMainCarouselData = async (): Promise<GiftCarouselItem[]> => {
  // const response = await axios.get("/api/gift-shop/main-carousel");
  return db.mainCarouselData
};

const getCategoryNavigation = async (): Promise<CategoryNavList[]> => {
  // const response = await axios.get("/api/gift-shop-navigation");
  return db.catgoryNavigation;
};

const getPopularProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gift-shop/products?tag=popular");
  return popularProducts;
};

const getTopSailedProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gift-shop/products?tag=top-sailed");
  return topSailedProducts;
};

const getAllProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gift-shop/products");
  return allProducts;
};

const getServiceList = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/gift-shop/service-list");
  return db.serviceList;
};

const getTopCategories = async (): Promise<Partial<Category>[]> => {
  // const response = await axios.get("/api/gift-shop/top-categories");
  return db.categories
};

export default {
  getAllProducts,
  getServiceList,
  getTopCategories,
  getPopularProducts,
  getMainCarouselData,
  getTopSailedProducts,
  getCategoryNavigation,
};
