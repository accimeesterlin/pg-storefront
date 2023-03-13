import User from "@models/user.model";
import nc from "next-connect";
import { authenticationMiddleware } from "../token/verify";

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

    // TODO: get the following
    // Orders
    // Await Payments Total
    // Order Total
    // Await Delivery
    // Balance
    // Wishlists
    // Addresses
    // Payment Methods
    // Support Tickets
    
    if (user?.apiKeySecret) {
      delete user?.apiKeySecret;
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

export default nc().use(authenticationMiddleware).get(getHandler);
