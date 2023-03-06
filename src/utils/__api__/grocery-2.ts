import Service from "models/service.model";
import Product from "models/product.model";
import Category from "models/category.model";
import { GroceryTwoCarouselItem } from "models/carousel.model";

import * as db from "../../__server__/__db__/grocery-2/data";

const getServices = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/grocery-2/services");
  return  db.serviceList;
};

const getCategories = async (): Promise<Category[]> => {
  // const response = await axios.get("/api/grocery-2/categories");
  return db.categories;
};

const getDiscountBannerList = async () => {
  // const response = await axios.get("/api/grocery-2/discount-card-list");
  return db.discountCardList;
};

const getNavigationList = async () => {
  // const response = await axios.get("/api/grocery-2/category-navigation");
  return db.categoryNavigation;
};

const getFeaturedProducts = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "featured-items");

  // const response = await axios.get("/api/grocery-2/featured-products");
  return products;
};

const getBestSellProducts = async (): Promise<Product[]> => {
  const bestSellProducts = db.products.filter((item) => item.for.type === "best-sell-products");

  // const response = await axios.get("/api/grocery-2/best-sell-products");
  return bestSellProducts;
};

const getBestHomeProducts = async (): Promise<Product[]> => {
  const essProducts = db.products.filter((item) => item.for.type === "home-essentials-products");

  // const response = await axios.get("/api/grocery-2/home-essentials-products");
  return essProducts;
};

const getDairyProducts = async (): Promise<Product[]> => {
  const moreProducts = db.products.filter((item) => item.for.type === "more-products");

  // const response = await axios.get("/api/grocery-2/more-products");
  return moreProducts;
};

const getTestimonials = async () => {
  // const response = await axios.get("/api/grocery-2/testimonial-list");
  return db.testimonialList;
};

const getMainCarousel = async (): Promise<GroceryTwoCarouselItem[]> => {
  // const response = await axios.get("/api/grocery-2/main-carousel");
  return db.mainCarouselData;
};

export default {
  getServices,
  getCategories,
  getTestimonials,
  getMainCarousel,
  getDairyProducts,
  getNavigationList,
  getFeaturedProducts,
  getBestSellProducts,
  getBestHomeProducts,
  getDiscountBannerList,
};
