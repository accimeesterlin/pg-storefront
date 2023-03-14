import Address from "@models/address.model";
import Checkout from "@models/checkout.model";
import User from "@models/user.model";
import { createContext, FC, ReactNode, useContext, useMemo, useReducer } from "react";

// =================================================================================
type InitialState = { cart: CartItem[]; isHeaderFixed: boolean, user: User, checkout: Checkout};

export type CartItem = {
  qty: number;
  name: string;
  slug?: string;
  price: number;
  mainImageUrl?: string;
  shopId?: string;
  id: string | number;
};

type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type UserActionType = { type: "SET_USER"; payload: User };
type PaymentMethodActionType = { type: "SET_PAYMENT_METHOD"; payload: string };
type CheckoutActionType = { type: "SET_CHECKOUT"; payload: Checkout };
type AddressActionType = { type: "SET_ADDRESS"; payload: Address[] };
type LayoutActionType = { type: "TOGGLE_HEADER"; payload: boolean };
type ActionType = CartActionType | LayoutActionType | UserActionType | AddressActionType | CheckoutActionType | PaymentMethodActionType;

// =================================================================================

const INITIAL_CART = [
  {
    qty: 1,
    price: 210,
    slug: "silver-high-neck-sweater",
    name: "Silver High Neck Sweater",
    id: "6e8f151b-277b-4465-97b6-547f6a72e5c9",
    mainImageUrl: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
  },
  {
    qty: 1,
    price: 110,
    slug: "yellow-casual-sweater",
    name: "Yellow Casual Sweater",
    id: "76d14d65-21d0-4b41-8ee1-eef4c2232793",
    mainImageUrl: "/assets/images/products/Fashion/Clothes/21.YellowCasualSweater.png",
  },
  {
    qty: 1,
    price: 140,
    slug: "denim-blue-jeans",
    name: "Denim Blue Jeans",
    id: "0fffb188-98d8-47f7-8189-254f06cad488",
    mainImageUrl: "/assets/images/products/Fashion/Clothes/4.DenimBlueJeans.png",
  },
];

const INITIAL_STATE = {
  cart: INITIAL_CART,
  isHeaderFixed: false,
  user: {},
  checkout: {
    address: {},
    paymentMethod: "",
    billingAddress: {},
  }
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

    case "SET_USER":
      return {
        ...state,
        user: {
        ...state.user,
        ...action.payload,
      }
    };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        checkout: {
        ...state.checkout,
        paymentMethod: action.payload,
      }
    };


    case "SET_ADDRESS":
      return {
        ...state,
        user: {
        ...state.user,
        addresses: action.payload,
      }
    };

    case "SET_CHECKOUT":
      return {
        ...state,
        checkout: {
        ...state.checkout,
        ...action.payload,
      }
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
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
