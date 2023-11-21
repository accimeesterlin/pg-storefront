import { ceil } from "lodash";
import { differenceInMinutes } from "date-fns";
import { themeGet } from "@styled-system/theme-get";

export const getTheme = (query: string, fallback?: string) => themeGet(query, fallback);

// CONVERT HEX TO RGB COLOR
export const convertHexToRGB = (hex: string) => {
  // check if it's a rgba

  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

// GET THE DATE/TIME DIFFERENCE
export const getDateDifference = (date) => {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";

  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;

  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
};

export const renderProductCount = (
  page: number,
  productPerPage: number,
  totalProductLenth: number
) => {
  let startNumber = page * productPerPage;
  let endNumber = (page + 1) * productPerPage;

  if (endNumber > totalProductLenth) endNumber = totalProductLenth;

  return `Showing ${startNumber + 1}-${endNumber} of ${totalProductLenth} products`;
};

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

export function calculateDiscount(price: number, comparePrice: number) {
  const afterDiscount = Number((price - price * (comparePrice / 100)).toFixed(2));

  return currency(afterDiscount);
}

export function calculateRemainingPercentage(part, whole) {
  const percentage = (part / whole) * 100;
  const remainingPercentage = 100 - percentage;
  return remainingPercentage?.toFixed(2)?.replace(/\.?0+$/, "");;
}

export function calculatePercentage(part, whole) {
  const percentage = (part / whole) * 100;
  return percentage?.toFixed(2)?.replace(/\.?0+$/, "");
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

export function currency(price: number, fraction: number = 2) {
  // const { publicRuntimeConfig } = getConfig();
  // currency: publicRuntimeConfig.currency,

  const formatCurrency = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  });

  return formatCurrency.format(price);
}


export function storePathValues() {
  const storage = globalThis?.sessionStorage;

  if (!storage) return;
  // Set the previous path as the value of the current path.
  const prevPath = storage.getItem("currentPath");
  const pathName = globalThis.location.pathname;
  if (pathName !== prevPath) {
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", pathName);
  }
}


export function getPreviousPath() {
  const storage = globalThis?.sessionStorage;

  if (!storage) return;
  // Set the previous path as the value of the current path.
  const prevPath = storage.getItem("prevPath");

  if (prevPath === "/signout") {
    return "/profile";
  }

  return prevPath;
}

export const getTotalPrice = (cart: any[]) => {
  return cart.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;
};

export function getTotalQuantity(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i].qty;
  }
  return total;
}

export function groupByShopId(arr) {
  const result = {};
  arr.forEach(item => {
    if (!result[item.shopId]) {
      result[item.shopId] = [];
    }
    result[item.shopId].push(item);
  });
  return result;
}


export const createLocalStorage = (key) => {
  const saveData = (data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error saving ${key} to local storage:`, error);
    }
  };

  const getData = () => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error(`Error retrieving ${key} from local storage:`, error);
      return undefined;
    }
  };

  return [saveData, getData];
};

export function clearLocalStorageKeys(keys: string[]) {
  keys.forEach((key) => localStorage.removeItem(key));
}

export function removeEmptyStrings(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== "" || value !== null || value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}


export function capitalizeWord(inputWord: string) {
  // Replace underscores and hyphens with spaces
  let formattedWord = inputWord?.replace(/[_-]/g, " ");

  // Capitalize the first letter
  formattedWord =
    formattedWord.charAt(0).toUpperCase() + formattedWord.slice(1);

  return formattedWord;
}