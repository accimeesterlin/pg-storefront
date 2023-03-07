import axios from "axios";

import Shop from "models/shop.model";

const API_URL = process.env.NEXT_PUBLIC_SELLER_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});


export const getShopList = async (): Promise<Shop[]> => {
  const response = await api.get("/api/user/shops");

  console.log("Shops: ", response?.data);
  return response.data?.shops;
};


export const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const shops = await getShopList();
  const slugs = shops.map((item) => ({ params: { slug: item.slug } }));
  return slugs;
};

export const getShopBySlug = async (slug: string): Promise<Shop> => {
  const response = await api.get("/api/user/shops/single", { params: { slug } });

  return response.data;
};

export default { getShopList, getSlugs, getShopBySlug };
