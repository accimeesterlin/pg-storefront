import Product from "./product.model";

export enum ShopTheme {
  DEFAULT = "default",
  MARKET = "market",
  FASHION = "fashion",
  GROCERY = "grocery",
  FURNITURE = "furniture",
  GADGET = "gadget",
  GIFT = "gift",
  HEALTH_BEAUTY = "health_beauty",
}

interface Shop {
  id?: string;
  slug?: string;
  user?: any;
  description?: string;
  email?: string;
  name?: string;
  merchantId?: string;
  theme?: ShopTheme;
  phone?: string;
  headerColorHex?: string;
  footerColorHex?: string;
  primaryColorHex?: string;
  secondaryColorHex?: string;
  walletAddress?: string;
  address?: string;
  rating?: number;
  verified?: boolean;
  products?: Product[];
  paymentMethods?: PaymentMethods[];
  coverPicture?: string;
  profilePicture?: string;
  socialMedialLinks?: { facebook?: string; youtube?: string; twitter?: string; instagram?: string };
  crispWebsiteId?: string;
}

export enum PaymentMethods {
  MONCASH = "moncash",
  PAYPAL = "paypal",
  STRIPE = "stripe",
  CASH = "cash",
  CREDIT_CARD = "credit_card",
}

export default Shop;
