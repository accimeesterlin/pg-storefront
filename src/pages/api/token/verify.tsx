import isEmpty from "lodash.isempty";
import { verifyCognitoToken } from "../utils/authUtils";
import { getUser } from "../queries/getUser";

const log = console?.log;
log("PID", process.pid);

const { USER_BRANCH, WEBSITE_ORIGIN } = process.env;

export const verifyToken = async (req: {
  query: any;
  headers: { authorization: string, cookies: any };
  cookies: { token: string; shopId: string };
  body: { isPrepaid: boolean, token: string, shopId: string };
  method: string;
}) => {
  const authorization = req?.headers?.authorization || "";
  const cookies = req?.cookies


  let token = cookies?.token || "";
  // const shopId = req?.body?.shopId;

  if (authorization?.includes("Bearer") && isEmpty(token)) {
    token = authorization?.split(" ")[1];
  }

  if (isEmpty(authorization) && isEmpty(token)) {
    throw new Error("Token needs to be provided");
  }

  try {
    let cognitoResult;
    let userID;

    cognitoResult = await verifyCognitoToken(token);
    userID = cognitoResult?.sub || cognitoResult?.username;

    const currentUser = await getUser(userID);

    const { isLocked, isBanned } = currentUser;

    const tokenData = { user: currentUser, userID };

    if (isBanned || isLocked) {
      throw new Error("Your account is either banned or locked!");
    }

    return {
      ...tokenData,
      user: currentUser,
    };
  } catch (error) {
    throw new Error(
      `${error?.message} - session might be expired. Sign out and login again` ||
        "Access unauthorized!!!"
    );
  }
};

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const tokenData: any = await verifyToken(req);
    req.tokenData = tokenData;
    next();
  } catch (error) {
    log("Error: ", error);
    res.status(error?.status || 401).json({
      message: error?.message || "Internal Server Error",
    });

    return res.redirect("/login");
  }
};

const createRoleMiddleware = (role) => async (req, res, next) => {
  try {
    const tokenData = await verifyToken(req);
    const userRole = tokenData?.user[role];

    if (userRole) {
      req.tokenData = tokenData;
      return next();
    }

    return res.status(401).json({
      message: "You don't have access to this resource",
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Internal Server Error",
    });
  }
};

export const adminMiddleware = createRoleMiddleware("isAdmin");
export const agentMiddleware = createRoleMiddleware("isAgent");
export const superAdminMiddleware = createRoleMiddleware("isSuperAdmin");

export const isDev =
  USER_BRANCH === "local" ||
  USER_BRANCH === "dev" ||
  USER_BRANCH === "development";

export const isProd =
  WEBSITE_ORIGIN === "https://app.pgecom.com" || USER_BRANCH === "staging";

// export const isProd = true;
