import User from "@models/user.model";
import nc from "next-connect";
import Joi from "joi";
import isEmpty from "lodash.isempty";
import { v4 as uuidv4 } from "uuid";
import { getAddressById, getAddressByStreet, getAddressByUserId } from "../../queries/getAddress";
import { authenticationMiddleware } from "../../token/verify";
import { updateAddress } from "../../mutation/address";

const getHandler = async (req, res) => {
  try {
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    const addresses = await getAddressByUserId(userID);
    return res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};

// Define schema for customer
export const payloadSchema = Joi.object({
  // Required
  name: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip: Joi.string().required(),
  country: Joi.string().required(),

  // Optional
  id: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
});

const createHandler = async (req, res) => {
  try {
    const payload = await payloadSchema.validateAsync(req?.body);
    const user: User = req?.tokenData?.user;

    const userID = user?.id;

    const street = payload?.street;
    const addressId = payload?.id || uuidv4();

    let address = payload;

    try {

      if (payload?.id) {
        address = await getAddressById(payload?.id);
      } else {
        address = await getAddressByStreet(street);
      }
    } catch (error) {
      // Do nothing
    }

    if (!isEmpty(address) && !payload?.id) {
      return res.status(400).json({
        message: "Address already exists",
      });
    }

    const addressPayload = {
      ...address,
      ...payload,
      id: addressId,
      userID,
    };

    await updateAddress(addressPayload);

    return res.json({
      ...addressPayload,
      message: "Address created!",
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
  .post(createHandler);
