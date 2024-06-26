import Shop from "./shop.model";
import Review from "./Review.model";

interface Product {
  inventory?: any;
  slug?: string;
  description?: string;
  price?: number;
  title?: string;
  name?: string; // Deprecated
  rating?: number;
  comparePrice?: number;
  mainImageUrl?: string;
  id?: string;
  published?: boolean;
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: any[];
  categories?: any[];
  reviews?: Review[];
}

export default Product;
