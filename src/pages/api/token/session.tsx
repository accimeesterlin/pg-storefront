import nc from "next-connect";
import { getShopByMerchantId } from "../queries/getShop";
import { getUserById } from "../queries/getUser";
import { verifyCognitoToken } from "../utils/authUtils";
import Shop from '@models/shop.model';

const handler = async (req, res) => {
  try {
    const token = req?.cookies?.token || req?.cookies?.session;
    const cognitoTokenResult = await verifyCognitoToken(token);
    const userID = cognitoTokenResult?.sub || cognitoTokenResult?.username;

    const currentUser: any = await getUserById(userID);

    let shops: Shop[];

    try {
      shops = await getShopByMerchantId(userID);
    } catch (error) {
      shops = [];
    }

    const isActive = currentUser?.isActive;
    const isBanned = currentUser?.isBanned;
    const isLocked = currentUser?.isLocked;
    const isVerified = currentUser?.isVerified;
    const isPhoneVerified = currentUser?.isPhoneVerified || false;
    const isNewVisaDesign = currentUser?.isNewVisaDesign;
    const isAgent = currentUser?.isAgent;
    const isEmailVerified = currentUser?.isEmailVerified;
    const isOnboardingCompleted = currentUser?.isOnboardingCompleted;

    // More information
    const email = currentUser?.email;
    const phone = currentUser?.phone;
    const ip = currentUser?.ip;
    const cardId = currentUser?.cardId;
    const cardHolderId = currentUser?.cardHolderId;
    const fullName = currentUser?.fullName;
    const isShopOwner = shops?.length > 0;

    return res.json({
      isActive,
      isBanned,
      isLocked,
      isEmailVerified,
      isNewVisaDesign,
      isAgent,
      isVerified,
      isPhoneVerified,
      isOnboardingCompleted,
      email,
      phone,
      fullName,
      ip,
      isShopOwner,
      cardId,
      cardHolderId,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Issue generating the token",
      status: error?.status || 500,
    });
  }
};

export default nc().get(handler);
