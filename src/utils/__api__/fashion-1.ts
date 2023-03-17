import Product from "models/product.model";
import Service from "models/service.model";

import * as db from "../../__server__/__db__/fashion-1/data";
// import shops from "../../__server__/__db__/shop/data";

const getFlashDeals = async (): Promise<Product[]> => {
  const flashItems = db.products.filter((item) => item.for.type === "flash-deals");

  // const response = await axios.get("/api/fashion-1/products?tag=flash");
  return flashItems;
};

const getNewArrivals = async (): Promise<Product[]> => {
  const newItems = db.products.filter((item) => item.for.type === "new-arrivals");
  // const response = await axios.get("/api/fashion-1/products?tag=new");
  return newItems;
};

const getTrendingItems = async (): Promise<Product[]> => {
  const trendingItems = db.products.filter((item) => item.for.type === "trending-items");
  // const response = await axios.get("/api/fashion-1/products?tag=trending");
  return trendingItems;
};

const getServiceList = async (): Promise<Service[]> => {
  // const response = await axios.get("/api/fashion-1/service-list");
  return db.serviceList;
};

const getDealOfTheWeekList = async () => {
  // const response = await axios.get("/api/fashion-1/deal-of-the-week");
  return db.dealOfTheWeekList;
};

const getHotDealList = async () => {
  // const response = await axios.get("/api/fashion-1/hot-deals");
  return db.hotDealsData;
};

export default {
  getFlashDeals,
  getNewArrivals,
  getServiceList,
  getHotDealList,
  getTrendingItems,
  getDealOfTheWeekList,
};
