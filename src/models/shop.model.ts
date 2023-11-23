import Product from "./product.model";

interface Shop {
  id?: string;
  slug?: string;
  user?: any;
  description?: string;
  email?: string;
  name?: string;
  merchantId?: string;
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
  coverPicture?: string;
  profilePicture?: string;
  socialMedialLinks?: { facebook?: string; youtube?: string; twitter?: string; instagram?: string };
}

export default Shop;
