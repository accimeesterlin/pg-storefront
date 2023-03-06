import Blog from "models/blog.model";
import Product from "models/product.model";
import Category from "models/category.model";
import { Banner } from "models/gadget.model";

import * as db from "../../__server__/__db__/gadget/data";

const getProducts = (type: string) => db.products.filter((item) => item.for.type === type);
const topPicksProducts = getProducts("top-picks-products");
const mostViewProducts = getProducts("most-viewed-products");
const newArrivalProducts = getProducts("new-arrival-products");


const getFeaturedCategories = async (): Promise<Category[]> => {
  // const response = await axios.get("/api/gadget-store/featured-categories");
  return db.categories;
};

const getTwoBanner = async (): Promise<Banner[]> => {
  // const response = await axios.get("/api/gadget-store/two-banners");
  return db.bannerData;
};

const getBlogLists = async (): Promise<Blog[]> => {
  // const response = await axios.get("/api/gadget-store/blog-lists");
  return db.articles;
};

const getMainCarousel = async () => {
  // const response = await axios.get("/api/gadget-store/main-carousel");
  return db.carouselProducts;
};

const getTopPicksList = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gadget-store/products?tag=top-picks");
  return topPicksProducts;
};

const getMostViewedList = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gadget-store/products?tag=most-viewed");
  return mostViewProducts;
};

const getNewArrival = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/gadget-store/products?tag=new-arrival");
  return newArrivalProducts;
};

export default {
  getTwoBanner,
  getBlogLists,
  getNewArrival,
  getMainCarousel,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories,
};
