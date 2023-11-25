import { GlobalSetting } from "@models/globalSetting.model";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://app.pgecom.com";

const api = axios.create({
    baseURL: `${API_URL}/api`,
});


export const getGlobalSetting = async (): Promise<GlobalSetting> => {
    try {
        const response = await api.get("/setting/globalsetting");
        return response.data;
    } catch (error) {
        return {}
    }
};


export default { getGlobalSetting };
