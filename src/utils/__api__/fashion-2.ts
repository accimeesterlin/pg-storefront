// import axios from "axios";
import Blog from "models/blog.model";
import Brand from "models/Brand.model";
import Product from "models/product.model";
import Service from "models/service.model";
import Category from "models/category.model";
import MainCarouselItem from "models/market-1.model";

import * as db from "../../__server__/__db__/fashion-2/data";

const getProductsData = (type: string) => db.products.filter((item) => item.for.type === type);

const saleProducts = getProductsData("sale-products");
const latestProducts = getProductsData("latest-products");
const popularProducts = getProductsData("popular-products");
const featureProducts = getProductsData("featured-products");
const bestWeekProducts = getProductsData("best-week-products");
const bestSellingProducts = getProductsData("best-selling-product");


const getProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products");
  return bestSellingProducts;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products?tag=feature");
  return featureProducts;
};

const getSaleProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products?tag=sale");
  return saleProducts;
};

const getPopularProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products?tag=popular");
  return popularProducts;
};

const getLatestProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products?tag=latest");
  return latestProducts;
};

const getBestWeekProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/fashion-shop-2/products?tag=best-week");
  return bestWeekProducts;
};

const getBlogs = async (): Promise<Blog[]> => {
  // const response = await axios.get("/api/fashion-shop-2/blogs");
  return db.articles;
};

const getServices = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/fashion-shop-2/service");
  return db.serviceList;
};

const getCategories = async (): Promise<Category[]> => {
  // const response = await axios.get("/api/fashion-shop-2/category");
  return db.categories;
};

const getMainCarouselData = async (): Promise<MainCarouselItem[]> => {
  // const response = await axios.get("/api/fashion-shop-2/main-carousel");
  return db.mainCarouselData;
};

const getBrands = async (): Promise<Brand[]> => {
  // const response = await axios.get("/api/fashion-shop-2/brands");
  return db.brandList;
};

export default {
  getBlogs,
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getSaleProducts,
  getLatestProducts,
  getPopularProducts,
  getFeatureProducts,
  getBestWeekProducts,
  getMainCarouselData,
};
