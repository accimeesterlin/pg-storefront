import Balance from "./balance.model";
import Order from "./order.model";
import Address from "./address.model";

interface User {
  id?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  avatar?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  profileImageUrl?: string;
  birthDay?: string;
  verified?: boolean;
  apiKeySecret?: string;
  balance?: Balance
  orders?: Order[];
  addresses?: Address[];
}

export default User;
