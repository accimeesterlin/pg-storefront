import nc from "next-connect";

import { getAddressById } from "../../queries/getAddress";

const getHandler = async (req, res) => {
  try {
    const addressId: string = req?.query?.id;


    const addresses = await getAddressById(addressId);
    return res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Error finding user",
    });
  }
};


export default nc() .get(getHandler)
