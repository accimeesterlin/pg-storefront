import nc from "next-connect";
import { purgeCache } from "@netlify/functions";

console.log("PID: ", process.pid);

const clearAllCacheHandler = async (req, res) => {
  try {
    console.log("Purging everything");

    await purgeCache();

    return res.json({
      message: "Successfully purged all cache",
      status: 200 || req?.status,
    });
  } catch (error) {
    const errorData = error?.response?.data;
    return res.status(500).json({
      message: error?.message || errorData?.message || "Internal server error",
      status: error?.status || 500,
    });
  }
};

export default nc().get(clearAllCacheHandler);
