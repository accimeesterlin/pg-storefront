import User from "./user.model";

interface Address {
  id?: string;
  user?: User;
  city?: string;
  title?: string;
  phone?: string;
  street?: string;
  email?: string;
  company?: string;
  apartment?: string;
  country?: string;
  zip?: string;
  state?: string;
  name?: string;
  userID?: string;
}

export default Address;
