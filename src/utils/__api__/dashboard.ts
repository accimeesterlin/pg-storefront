// import axios from "axios";

// import * as db from "../../__server__/__db__/market-1/data";
// import shops from "../../__server__/__db__/shop/data";
import { cardList, salesData, topCountryList } from "../../__server__/__db__/dashboard/data";

const getSummeryCards = async () => {
  // const response = await axios.get("/api/admin/summery");
  return cardList;
};

const getCountryBasedSales = async () => {
  // const response = await axios.get("/api/admin/top-countries");
  return topCountryList;
};

const getSales = async () => {
  // const response = await axios.get("/api/admin/sales");
  return salesData;
};

export default { getSummeryCards, getCountryBasedSales, getSales };
