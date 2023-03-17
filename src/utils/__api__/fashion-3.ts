import Blog from "models/blog.model";
import Product from "models/product.model";
import Service from "models/service.model";
import { MainCarouselItem } from "models/market-2.model";

import { mainCarouselData, products, serviceList, blogs } from "../../__server__/__db__/fashion-3/data";

const bestSell = products.filter((item) => item.for.type === "best-selling-product");
const featureProducts = products.filter((item) => item.for.type === "featured-products");


const getProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-3/products");
  return bestSell;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-3/products?tag=feature");
  return featureProducts;
};

const getMainCarouselData = async (): Promise<MainCarouselItem[]> => {
  // const response = await axios.get("/api/fashion-shop-3/main-carousel");
  return mainCarouselData;
};

const getServices = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/fashion-shop-3/services");
  return serviceList;
};

const getBlogs = async (): Promise<Blog[]> => {
  // const response = await axios.get("/api/fashion-shop-3/blogs");
  return blogs;
};

export default { getProducts, getFeatureProducts, getMainCarouselData, getServices, getBlogs };
