import nc from "next-connect";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash.isempty";
import multer from "multer";
import multerS3 from "multer-s3";
import { createProduct } from "pages/api/mutation/product";
import { getProductById, getProductByShopId } from "pages/api/queries/getProduct";
import MulterS3File from "@models/file.model";
import { createImage } from "pages/api/mutation/image";
import { authenticationMiddleware } from "pages/api/token/verify";
import Collection from "@models/collection.model";
import { removeEmptyStrings } from "@utils/utils";
import { s3 } from "pages/api/utils/authUtils";

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
    const shopId =
      req?.tokenData?.shopId || "a91608da-69e1-488a-afa7-0ee6e5127f4d";

    const fileName = `${folder}/${shopId}/${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

const uploadMiddleware = upload.array("files");

// Define schema for collection
export const productSchema = Joi.object({
  // Required
  name: Joi.string().required(),
  price: Joi.number().required(),

  // Optional
  inventory: Joi.number().allow(null, "").default(1),
  shopId: Joi.string().allow(null, ""),
  comparePrice: Joi.number().allow(null, ""),
  slug: Joi.string().allow(null, ""),
  published: Joi.boolean().allow(null, ""),
  searchEngineMetaDataId: Joi.string().allow(null, ""),
  costPerItem: Joi.number().allow(null, ""),
  description: Joi.string().allow(null, ""),
  collectionId: Joi.string().allow(null, ""),
  productType: Joi.string().allow(null, "").default("physical"),
  sku: Joi.string().allow(null, ""),
  weight: Joi.string().allow(null, ""),
  categoryId: Joi.string().allow(null, ""),
  isFeatured: Joi.boolean().allow(null, ""),
  discountId: Joi.string().allow(null, ""),
  vendor: Joi.string().allow(null, ""),
  status: Joi.string().allow(null, ""),
  isContinueSellingOutStock: Joi.boolean().optional().default(false),
  collections: Joi.string().allow(null, ""),
});

export const productHandler = async (req, res) => {
  try {
    const payload = await productSchema.validateAsync(req?.body);
    const name = payload?.name;
    const price = payload?.price;
    const inventory = payload?.inventory;
    const status = payload?.status || "draft";
    let collectionId;

    if (payload?.collectionId) {
      collectionId = payload?.collectionId;
    }

    const slugName = payload?.slug || name;
    const slug = slugName?.toLowerCase()?.replace(/ /g, "-");

    let collections: Collection[];

    if (payload?.collections) {
      collections = JSON.parse(payload?.collections);
    }

    const files = req?.files;
    const productId = uuidv4();
    const shopId =
      req?.tokenData?.shopId || "f551e360-b418-4da1-9569-984e36bfa15e";

    if (isEmpty(files)) {
      return res.status(500).json({
        message: "Must upload a file",
        status: 400,
      });
    }
    const mainImageUrl: string = files[0]?.location;

    if (files?.length > 1) {
      uploadBulkImages(files, productId, payload);
    }

    const productPayload = {
      id: productId,
      shopId,
      collections,
      mainImageUrl,
      name,
      price,
      inventory,
      status,
      slug,
      description: payload?.description,
      collectionId,
      costPerItem: payload?.costPerItem,
      productType: payload?.productType,
      sku: payload?.sku,
      weight: payload?.weight,
      categoryId: payload?.categoryId,
      isFeatured: payload?.isFeatured,
      discountId: payload?.discountId,
      vendor: payload?.vendor,
      searchEngineMetaDataId: payload?.searchEngineMetaDataId,

      isContinueSellingOutStock: payload?.isContinueSellingOutStock,

      published: status === "active",

      comparePrice: payload?.comparePrice || price,
    };

    const result = removeEmptyStrings(productPayload);
    await createProduct(result);

    return res.json(productPayload);
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

export const querySchema = Joi.object({
  shopId: Joi.string().allow(null, ""),
  id: Joi.string().allow(null, ""),
});

export const findProductHandler = async (req, res) => {
  try {
    const payload = await querySchema.validateAsync(req?.query);

    const shopId =
      req?.tokenData?.shopId || payload?.shopId || req?.cookies?.shopId;
    const id = payload?.id;
    if (id) {
      const product = await getProductById(id);
      return res.json(product);
    }
    const product = await getProductByShopId(shopId);

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal Server Error",
      status: error?.status || 500,
    });
  }
};

const uploadBulkImages = (files: any[], productId: string, payload: any) => {
  try {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const url = file?.location;
      const altText = file?.originalname;

      const imagePayload: MulterS3File & any = {
        url,
        altText,
        productId,
      };

      if (payload?.collectionId) {
        imagePayload.collectionId = payload?.collectionId;
      }

      createImage(imagePayload);
    }
  } catch (error) {
    console.log("Error uploading bulk images", error);
  }
};

export default nc()
  .get(findProductHandler)
  .use(authenticationMiddleware)
  .use(uploadMiddleware)
  .post(productHandler);
