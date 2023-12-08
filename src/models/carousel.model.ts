export interface FurnitureCarouselItem {
  id: string | number;
  title: string;
  mainImageUrl: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
  description: string;
}

export interface GiftCarouselItem {
  id: string | number;
  title: string;
  mainImageUrl: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface HealthCarouselItem {
  id: string | number;
  title: string;
  mainImageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export interface GroceryTwoCarouselItem {
  id: number;
  title: string;
  mainImageUrl: string;
  description: string;
  appStoreLink: string;
  playStoreLink: string;
}
