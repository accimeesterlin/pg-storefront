import User from "@models/user.model";
import nc from "next-connect";
import { authenticationMiddleware } from "../token/verify";

console.log("PID: ", process.pid);

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

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
