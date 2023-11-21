import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import * as db from "../../__server__/__db__/market-1/data";
import shops from "../../__server__/__db__/shop/data";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
  baseURL: `${API_URL}/api/v1/storefront`,
});

const getTopRatedProduct = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "top-ratings");
  // const response = await axios.get("/api/market-1/toprated-product");
  return products
};

const getTopRatedBrand = async () => {
  const featureBrands = db.brands.filter((item) => item.for.type === "featured-brands");
  // const response = await axios.get("/api/market-1/toprated-brand");
  return featureBrands
};

const getNewArrivalList = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "new-arrivals");
  // const response = await axios.get("/api/market-1/new-arrivals");
  return products
};

const getCarBrands = async (): Promise<Brand[]> => {
  const carBrands = db.brands.filter((item) => item.for.type === "car-brands");
  // const response = await axios.get("/api/market-1/car-brand-list");
  return carBrands;
};

const getCarList = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "cars");
  // const response = await axios.get("/api/market-1/car-list");
  return products
};

const getMobileBrands = async (): Promise<Brand[]> => {
  const mobileBrands = db.brands.filter((item) => item.for.type === "mobile-brands");
  // const response = await axios.get("/api/market-1/mobile-brand-list");
  return mobileBrands;
};

const getMobileShops = async (): Promise<Shop[]> => {
  const imageNames = ["herman miller", "otobi", "hatil", "steelcase"];
  const shopList = shops.slice(4, 8).map((item, i) => ({ ...item, mainImageUrl: imageNames[i] }));

  // const response = await axios.get("/api/market-1/mobile-shop-list");
  return shopList
};

const getMobileList = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "mobile-phones");
  // const response = await axios.get("/api/market-1/mobile-list");
  return products;
};

const getOpticsBrands = async (): Promise<Brand[]> => {
  const opticsBrands = db.brands.filter((item) => item.for.type === "optics-brands");
  // const response = await axios.get("/api/market-1/optics/watch-brands");
  return opticsBrands;
};

const getOpticsShops = async (): Promise<Shop[]> => {
  const imageNames = ["herman miller", "zeiss", "hatil", "steelcase"];
  const shopList = shops.slice(0, 4).map((item, i) => ({ ...item, mainImageUrl: imageNames[i] }));


  // const response = await axios.get("/api/market-1/optics/watch-shops");
  return shopList;
};

const getOpticsList = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "optics");

  // const response = await axios.get("/api/market-1/optics-list");
  return products;
};

const getCategories = async (): Promise<Category[]> => {
  const categories = db.categories.filter((item) => item.for.type === "categories");

  // const response = await axios.get("/api/market-1/bottom-categories");
  return categories;
};

const getMoreItems = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "more-products");

  // const response = await axios.get("/api/market-1/get-more-items");
  return products;
};

const getServiceList = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/market-1/get-service-list");
  return db.serviceList;
};


// Size of the carousel is 251 * 391
const getMainCarousel = async (shopId: string): Promise<MainCarouselItem[]> => {
  try {
    const response = await api.get(`/banner`, { params: { shopId } });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getFlashDeals = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "flash-deals");

  // const response = await axios.get("/api/market-1/flash-deals");
  return products;
};

const getTopCategories = async (): Promise<Category[]> => {
  const topCategories = db.categories.filter((item) => item.for.type === "top-categories");
  // const response = await axios.get("/api/market-1/top-categories");
  return topCategories;
};

const getBigDiscountList = async (): Promise<Product[]> => {
  const products = db.products.filter((item) => item.for.type === "big-discounts");
  // const response = await axios.get("/api/market-1/big-discounts");
  return products;
};

export default {
  getCarList,
  getCarBrands,
  getMoreItems,
  getFlashDeals,
  getMobileList,
  getCategories,
  getOpticsList,
  getServiceList,
  getMobileShops,
  getOpticsShops,
  getMainCarousel,
  getMobileBrands,
  getOpticsBrands,
  getTopCategories,
  getTopRatedBrand,
  getNewArrivalList,
  getBigDiscountList,
  getTopRatedProduct,
};
