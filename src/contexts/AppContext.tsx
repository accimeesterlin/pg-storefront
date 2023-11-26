import Address from "@models/address.model";
import Category from "@models/category.model";
import Checkout from "@models/checkout.model";
import { GlobalSetting } from "@models/globalSetting.model";
import Order from "@models/order.model";
import Product from "@models/product.model";
import Shop from "@models/shop.model";
import User from "@models/user.model";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

// =================================================================================
type InitialState = {
  cart: CartItem[];
  isHeaderFixed: boolean;
  user: User;
  menus: any[];
  footerMenus: any[];
  shop: Shop;
  products: Product[];
  checkout: Checkout;
  category: Category[];
  homeMenus: any[];
  globalSetting: GlobalSetting;
};

export type CartItem = {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  mainImageUrl?: string;
  shopId?: string;
  id: string | number;
};

export type ICart = CartItem[];

type PurchaseCartActionType = { type: "PURCHASE_COMPLETE" };
type LoadCartActionType = { type: "LOAD_CART"; payload: ICart };
type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type ShopActionType = { type: "SET_SHOP"; payload: Shop };
type UserActionType = { type: "SET_USER"; payload: User };
type ProductListType = { type: "SET_PRODUCT_LIST"; payload: Product[] };
type OrderActionType = { type: "SET_ORDER_LIST"; payload: Order[] };
type PaymentMethodActionType = { type: "SET_PAYMENT_METHOD"; payload: string };
type CheckoutActionType = { type: "SET_CHECKOUT"; payload: Checkout };
type AddressActionType = { type: "SET_ADDRESS"; payload: Address[] };
type FooterMenuActionType = { type: "SET_FOOTER_MENU"; payload: any[] };
type HomeMenuActionType = { type: "SET_HOME_MENU"; payload: any[] };
type CategoryActionType = { type: "SET_CATEGORY"; payload: any[] };
type GlobalSettingActionType = {
  type: "SET_GLOBAL_SETTING";
  payload: GlobalSetting;
};
type ProductActionType = { type: "LOAD_PRODUCTS"; payload: Product[] };
type LayoutActionType = { type: "TOGGLE_HEADER"; payload: boolean };
type NavigationMenuType = { type: "SET_NAVIGATION_MENU"; payload: any[] };
type ActionType =
  | CartActionType
  | LayoutActionType
  | ShopActionType
  | UserActionType
  | GlobalSettingActionType
  | NavigationMenuType
  | AddressActionType
  | HomeMenuActionType
  | ProductListType
  | CategoryActionType
  | FooterMenuActionType
  | CheckoutActionType
  | OrderActionType
  | PurchaseCartActionType
  | LoadCartActionType
  | ProductActionType
  | PaymentMethodActionType;

// =================================================================================

const INITIAL_CART = [];

const INITIAL_STATE = {
  cart: INITIAL_CART,
  isHeaderFixed: false,
  products: [],
  shop: {},
  menus: [],
  footerMenus: [],
  globalSetting: {},
  category: [],
  homeMenus: [],
  user: {
    orders: [],
    products: [],
  },
  checkout: {
    address: {},
    paymentMethod: "",
    billingAddress: {},
  },
};

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "SET_SHOP":
      return { ...state, shop: action.payload };

    case "SET_PRODUCT_LIST":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SET_HOME_MENU":
      return {
        ...state,
        homeMenus: action.payload,
      };

    case "SET_GLOBAL_SETTING":
      return {
        ...state,
        globalSetting: action.payload,
      };

    case "SET_NAVIGATION_MENU":
      return {
        ...state,
        menus: action.payload,
      };

    case "SET_FOOTER_MENU":
      return {
        ...state,
        footerMenus: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          paymentMethod: action.payload,
        },
      };

    case "SET_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: action.payload,
        },
      };

    case "PURCHASE_COMPLETE":
      return {
        ...state,
        cart: [],
        checkout: {
          ...state.checkout,
          address: {},
          billingAddress: {},
        },
      };

    case "SET_ORDER_LIST":
      return {
        ...state,
        user: {
          ...state.user,
          orders: action.payload,
        },
      };

    case "LOAD_PRODUCTS":
      return {
        ...state,
        user: {
          ...state.user,
          products: action.payload,
        },
      };

    case "SET_CHECKOUT":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          ...action.payload,
        },
      };

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
