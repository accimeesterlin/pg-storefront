import nc from "next-connect";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash.isempty";

import multer from "multer";
import multerS3 from "multer-s3";
import Joi from "joi";
import { serialize } from "cookie";
import { s3 } from "pages/api/utils/authUtils";
import {
  getLatestShops,
  getShopByMerchantId,
  getShopByName,
  getTotalShopCount,
} from "pages/api/queries/getShop";
import Shop from "@models/shop.model";
import { createShop } from "pages/api/mutation/shop";
import { getUserById } from "pages/api/queries/getUser";
import { authenticationMiddleware } from "pages/api/token/verify";

const { AWS_S3_BUCKET_NAME } = process.env;

const folder = "store";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const storage = multerS3({
  s3,
  bucket: AWS_S3_BUCKET_NAME,
  key(req, file, cb) {
    const user = req?.tokenData?.user;
    const merchantId = user?.id || user?.userID;

    const fileName = `${folder}/${merchantId}/${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

const uploadMiddleware = upload.array("files");

// Define schema for shop
export const shopSchema = Joi.object({
  // Required
  name: Joi.string().required(),
  description: Joi.string().required(),
  slug: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),

  // Optional
  walletAddress: Joi.string().allow(null, ""),
  facebookLink: Joi.string().allow(null, ""),
  twitterLink: Joi.string().allow(null, ""),
  instagramLink: Joi.string().allow(null, ""),
  youtubeLink: Joi.string().allow(null, ""),
});

export const querySchema = Joi.object({
  name: Joi.string().allow(null, ""),
});

export const shopHandler = async (req, res) => {
  try {
    const payload = await shopSchema.validateAsync(req?.body);
    const tokenData: any = req?.tokenData;
    const user = tokenData?.user;

    const verified = false;
    const rating = 0;
    const socialMedialLinks = {
      facebook: payload?.facebookLink,
      twitter: payload?.twitterLink,
      instagram: payload?.instagramLink,
      youtube: payload?.youtubeLink,
    };

    const merchantId = user?.id || user?.userID;
    const files: any[] = req?.files;
    const name = payload?.name?.toLowerCase();
    const slug = payload?.slug?.toLowerCase()?.replace(" ", "-");

    let shop;
    const profilePicture = files[0]?.location;
    const coverPicture = files[1]?.location;

    try {
      shop = await getShopByName(name);
    } catch (error) {
      // No shop found
    }

    if (!isEmpty(shop)) {
      return res.json({
        message: "Shop already exists",
        status: 400,
      });
    }

    const shopId = uuidv4();

    if (!profilePicture) {
      return res.json({
        message: "Image is required",
        status: 400,
      });
    }

    const cookieOptions = {
      httpOnly: true, // dev or prod
      maxAge: 3600,
      secure: false,
      // sameSite: "strict",
      path: "/",
    };

    // Set shop id cookie
    res.setHeader("Set-Cookie", serialize("shopId", shopId, cookieOptions));

    const shopPayload: Shop = {
      name,
      description: payload?.description,
      slug,
      verified,
      rating,
      socialMedialLinks,
      walletAddress: payload?.walletAddress,
      phone: payload?.phone,
      email: payload?.email,
      address: payload?.address,
      coverPicture,
      profilePicture,
      id: shopId,
      merchantId,
    };

    await createShop(shopPayload);

    return res.json(shopPayload);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export const findAllShopsHandler = async (req, res) => {
  try {
    const query = req?.query;
    const shops = await getLatestShops();
    const totalShops = await getTotalShopCount();

    const shopsWithUser = await Promise.all(
      shops.map(async (shop) => {
        const userId = shop?.merchantId;

        const user = await getUserById(userId);

        return {
          ...shop,
          user: {
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            phone: user?.phone,
            profilePicture: user?.mainImageUrl,
            company: user?.company,
            jobTitle: user?.jobTitle,
            language: user?.language,
            createdAt: user?.createdAt,
            country: user?.country,
            postal_code: user?.postal_code,
            city: user?.city,
            address: user?.address,
            state: user?.state,
          },
        };
      })
    );

    return res.json({
      shops: shopsWithUser,
      totalShops,
      ...query
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc({ attachParams: true })
  .get(findAllShopsHandler)
  .use(authenticationMiddleware)
  .use(uploadMiddleware)
  .post(shopHandler);
