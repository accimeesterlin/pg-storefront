import Product from "./product.model";

interface Collection {
    id?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    merchantId?: string;
    shopId?: string;
    files?: any[];
    discountId?: string;
    products?: Product[];
    mainImageUrl?: string;
    searchEngineTitle?: string;
    searchEngineDescription?: string;
    searchEngineUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default Collection;
