// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT under_construction@gmail.com
import shops from "./data";
import Mock from "../../mock";
import Shop from "@models/shop.model";
import { uniqueProudcts } from "../products/data";
import Product from "@models/product.model";

const getProducts = (slug: string) => uniqueProudcts.filter((item) => item?.shop?.slug === slug);

Mock.onGet("/api/shops").reply(async () => {
  try {
    return [200, shops];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/shops/single").reply(async (config) => {
  try {
    if (config?.params?.slug) {
      const shop: Shop = shops.find((item) => item.slug === config.params.slug);
      shop.products = getProducts(config.params.slug) as Product[];
      return [200, shop];
    }

    const shop: Shop = shops[0];
    shop.products = getProducts(shops[0].slug) as Product[];
    return [200, shop];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/shops/slugs").reply(async () => {
  try {
    const slugs = shops.map((item) => ({ params: { slug: item.slug } }));
    return [200, slugs];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/product/shops").reply(async () => {
  try {
    return [200, shops.slice(0, 4)];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
