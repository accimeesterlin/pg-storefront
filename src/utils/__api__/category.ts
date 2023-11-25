import Category from "@models/category.model";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
    baseURL: `${API_URL}/api/v1/storefront`,
});


const getCategoryByShopId = async (shopId): Promise<Category[]> => {
    try {
        const { data } = await api.get("/category", {
            params: {
                shopId,
            },
        })

        return data;
    } catch (error) {
        return [];
    }
};



export default {
    getCategoryByShopId,
};
