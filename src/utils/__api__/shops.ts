import axios from "axios";

import Shop from "models/shop.model";

const API_URL = process.env.NEXT_PUBLIC_SELLER_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});


export const getShopList = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/shops");
  return response.data;
};

export const getShops = async (): Promise<Shop[]> => {
  const response = await api.get("/api/shop/all");
  return response.data?.shops;
};

export const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const response = await axios.get("/api/shops/slugs");
  return response.data;
};

export const getShopBySlug = async (slug: string): Promise<Shop> => {
  const response = await axios.get("/api/shops/single", { params: { slug } });
  return response.data;
};

export default { getShopList, getShops, getSlugs, getShopBySlug };
