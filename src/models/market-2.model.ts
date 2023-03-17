import Product from "./product.model";

export interface MainCarouselItem {
  title?: string;
  mainImageUrl?: string;
  category?: string;
  comparePrice?: number;
  buttonLink?: string;
  buttonText?: string;
  description?: string;
}

export interface CategoryBasedProducts {
  products: Product[];
  category: { title: string; children: string[] };
}
