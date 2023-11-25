import axios from "axios";

import Shop from "models/shop.model";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
  baseURL: `${API_URL}/api/v1/storefront`,
});


export const getShopList = async (): Promise<Shop[]> => {
  try {
    const response = await api.get("/api/user/shops");
    return response.data?.shops;
  } catch (error) {
    return []
  }
};


export const getShopById = async (id: string): Promise<Shop> => {
  try {
    const response = await api.get(`/shop`, { params: { shopId: id } });
    return response.data;
  } catch (error) {
    return {}
  }
};

export const getShopMenus = async (id: string): Promise<Shop> => {
  try {
    const response = await api.get(`/menu`, { params: { shopId: id } });
    return response.data;
  } catch (error) {
    return {}
  }
};

export const getHomeMenus = async (shopId: string): Promise<Shop> => {
  try {
    const response = await api.get(`/menu/home`, { params: { shopId } });
    return response.data;
  } catch (error) {
    return {}
  }
};


export const getShopFooterMenus = async (id: string): Promise<Shop> => {
  try {
    const response = await api.get(`/menu/footer`, { params: { shopId: id } });
    return response.data;
  } catch (error) {
    return {}
  }
};


export const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const shops = await getShopList();
  const slugs = shops.map((item) => ({ params: { slug: item.slug } }));
  return slugs;
};

export const getShopBySlug = async (slug: string): Promise<Shop> => {
  try {
    const response = await api.get("/api/user/shops/single", { params: { slug } });

    return response.data;
  } catch (error) {
    return {}
  }
};

export default { getHomeMenus, getShopFooterMenus, getShopMenus, getShopList, getSlugs, getShopBySlug, getShopById };
