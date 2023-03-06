import axios from "axios";
import Product from "@models/product.model";
import Shop from "@models/shop.model";

import { uniqueProudcts } from "../../__server__/__db__/products/data";


const API_URL = process.env.NEXT_PUBLIC_SELLER_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const products = await getAvailableShop();

  const uniqueProducts = products.map((item) => ({ params: { slug: item.slug } }));

  console.log("Unique Products", uniqueProducts);
  return uniqueProducts;
};

// get product based on slug
const getProduct = async (slug: string): Promise<Product> => {
  const response = await api.get("/api/user/product/slug", { params: { slug } });
  return response.data;
};

const getDemoProduct = async (slug: string): Promise<Product> => {
  const product = uniqueProudcts?.find((item) => item.slug === slug);
  return product;
};

const getFrequentlyBought = async (): Promise<Product[]> => {
  const response = await api.get("/api/user/product/frequently-bought-products");
  return response.data;
};

const getRelatedProducts = async (productId: string): Promise<Product[]> => {
  const response = await api.get(`/api/user/product/related-products?productId=${productId}`);
  return response.data;
};

const getAvailableShop = async (): Promise<Shop[]> => {
  const response = await api.get("/api/user/product/shops");
  return response.data;
};

export default { getSlugs, getProduct, getFrequentlyBought, getRelatedProducts, getAvailableShop, getDemoProduct };
