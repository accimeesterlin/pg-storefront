import axios from "axios";
import Product from "@models/product.model";
import Shop from "@models/shop.model";

import { uniqueProudcts } from "../../__server__/__db__/products/data";


const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
  baseURL: `${API_URL}/api/v1/storefront`,
});

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  try {
    const products = await getAvailableShop();

    const uniqueProducts = products.map((item) => ({ params: { slug: item.slug } }));

    return uniqueProducts;
  } catch (error) {
    return [];
  }

};

// get product based on id
const getProduct = async (productId: string): Promise<Product> => {
  try {
    const response = await api.get(`/product`, { params: { productId } });
    return response.data;
  } catch (error) {
    return {};
  }
};

// get product based on slug
const getProducts = async (shopId: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/product/list`, { params: { shopId } });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error?.response);
    return [];
  }
};

const getDemoProduct = async (slug: string): Promise<Product> => {
  const product = uniqueProudcts?.find((item) => item.slug === slug);
  return product;
};

const getFrequentlyBought = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/api/user/product/frequently-bought");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getRelatedProducts = async (productId: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/api/user/product/related-products?productId=${productId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCollections = async (shopId: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/collection/list`, { params: { shopId } });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getAvailableShop = async (): Promise<Shop[]> => {
  try {
    const response = await api.get("/api/user/product/shops");
    return response.data;
  } catch (error) {
    return [];
  }
};

export default { getCollections, getSlugs, getProduct, getFrequentlyBought, getRelatedProducts, getAvailableShop, getDemoProduct, getProducts };
