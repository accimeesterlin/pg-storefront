import isEmpty from "lodash.isempty";
import { db } from "./authUtils";

const fetchData = async (params: any, queryName?: string) => {
  try {
    const data: any = await db.query(params).promise();
    const items = data?.Items;

    if (isEmpty(items)) {
      return [];
    }

    return items;
  } catch (error) {
    console.log("Error fetching data", error);
    const errorName = queryName || "fetchData";
    throw new Error(`${errorName} ${error?.message}`);
  }
};

export { fetchData };
