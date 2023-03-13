import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import multer from "multer";
import multerS3 from "multer-s3";
import { getAddressByUserId } from "../queries/getAddress";
import { getBalanceById } from "../queries/getBalance";
import { getOrderByUserId } from "../queries/getOrder";
import { authenticationMiddleware } from "../token/verify";
import { s3 } from "../utils/authUtils";
import MulterS3File from "@models/file.model";
import { updateUser } from "../mutation/user";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const folder = "profile";

const storage = multerS3({
  s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  key(req, file, cb) {
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    const fileName = `${folder}/${userID}/${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

const uploadMiddleware = upload.single("file");

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    // Execute the database queries in parallel
    const [balance, addresses, orders] = await Promise.all([
      getBalanceById(userID),
      getAddressByUserId(userID),
      getOrderByUserId(userID),
    ]);

    // TODO: get the following
    // Await Payments Total
    // Order Total
    // Await Delivery
    // Wishlists
    // Payment Methods
    // Support Tickets

    if (user?.apiKeySecret) {
      delete user?.apiKeySecret;
    }
    return res.json({
      ...user,
      addresses,
      orders,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

// Define schema for customer
export const payloadSchema = Joi.object({
  firstName: Joi.string().allow(null, ""),
  lastName: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  birthDay: Joi.string().allow(null, ""),
  file: Joi.string().allow(null, ""),
});

const updateHandler = async (req, res) => {
  try {
    const payload = await payloadSchema.validateAsync(req?.body);
    const user: User = req?.tokenData?.user;

    const userID = user?.id;
    const file: MulterS3File = req?.file;

    const profileImageUrl = file?.location || user?.profileImageUrl;
    const userPayload = {
      ...user,
      ...payload,
      id: userID,
      profileImageUrl,
    };

    await updateUser(userPayload);

    return res.json({
      ...userPayload,
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

export default nc()
  .use(authenticationMiddleware)
  .get(getHandler)
  .use(uploadMiddleware)
  .put(updateHandler);
