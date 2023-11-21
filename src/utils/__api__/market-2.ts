import Brand from "models/Brand.model";
import Product from "models/product.model";
import Service from "models/service.model";
import { CategoryBasedProducts, MainCarouselItem } from "models/market-2.model";

import * as db from "../../__server__/__db__/market-2/data";

const getProducts = async (): Promise<Product[]> => {
  // const response = await axios.get("/api/market-2/products");
  return db.products;
};

const getServices = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/market-2/service");
  return db.serviceList;
};

const getCategories = async () => {
  // const response = await axios.get("/api/market-2/categories");
  return db.categories;
};

const getBrands = async (): Promise<Brand[]> => {
  // const response = await axios.get("/api/market-2/brand");
  return db.brandList;
};

const getMainCarouselData = async (): Promise<MainCarouselItem[]> => {
  // const response = await axios.get("/api/market-2/main-carousel");
  return db.mainCarouselData;
};

const getElectronicsProducts = async (): Promise<CategoryBasedProducts> => {
  // const response = await axios.get("/api/market-2/category-based-product?tag=electronics");
  return { category: db.singleCategory, products: db.products }
};

const getMenFashionProducts = async (): Promise<CategoryBasedProducts> => {
  // const response = await axios.get("/api/market-2/category-based-product?tag=men");
  const data = {
    products: db.products.slice(2),
    category: { title: "Men's Fashion", children: db.singleCategory.children },
  };
  return data;
};

const getWomenFashionProducts = async (): Promise<CategoryBasedProducts> => {
  // const response = await axios.get("/api/market-2/category-based-product?tag=women");
  const data = {
    products: db.products.slice(3),
    category: { title: "Women's Fashion", children: db.singleCategory.children },
  };
  return data;
};

export default {
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getMainCarouselData,
  getMenFashionProducts,
  getElectronicsProducts,
  getWomenFashionProducts,
};
