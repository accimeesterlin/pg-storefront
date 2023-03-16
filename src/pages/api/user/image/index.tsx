import nc from "next-connect";
import Joi from "joi";
import multer from "multer";
import multerS3 from "multer-s3";

import { s3 } from "pages/api/utils/authUtils";
import { authenticationMiddleware } from "pages/api/token/verify";
import { getImageByShopId } from "pages/api/queries/getImages";
import { createImage } from "pages/api/mutation/image";

const { AWS_S3_BUCKET_NAME } = process.env;

const folder = "product";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const storage = multerS3({
  s3,
  bucket: AWS_S3_BUCKET_NAME,
  key(req, file, cb) {
    const shopId = req?.tokenData?.shopId;

    const fileName = `${folder}/${shopId}/${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

const uploadMiddleware = upload.array("files");

// Define schema for image
export const imageSchema = Joi.object({
  // Required
  url: Joi.string().required(),
  altText: Joi.string().required(),

  // Optional
  position: Joi.string().allow(null, ""),
  productId: Joi.string().allow(null, ""),
  collectionId: Joi.string().allow(null, ""),
});

export const imageHandler = async (req, res) => {
  try {
    const payload = await imageSchema.validateAsync(req?.body);
    const files = req?.files;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const url = file?.location;
      const altText = file?.originalname;

      const imagePayload = {
        ...payload,
        url,
        altText,
      };

      createImage(imagePayload);
    }

    const collection = await createImage(payload);

    return res.json(collection);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export const querySchema = Joi.object({
  shopId: Joi.string().required(),
});

export const findImageHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const shopId = payload?.shopId;
    const collection = await getImageByShopId(shopId);

    return res.json(collection);
  } catch (error) {
    return res.json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export default nc()
  .get(findImageHandler)
  .use(authenticationMiddleware)
  .use(uploadMiddleware)
  .post(imageHandler);
