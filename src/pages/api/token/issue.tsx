import nc from "next-connect";
import Joi from "joi";
import { verifyCognitoToken } from "../utils/authUtils";


console.log("PID: ", process.pid);


export const tokenSchema = Joi.object({
  token: Joi.string().required(),
  ip: Joi.string().allow(null, ""),
});

const handler = async (req, res) => {
  try {
    const payload = await tokenSchema.validateAsync(req?.body);

    const cognitoTokenResult = await verifyCognitoToken(payload?.token);

    // Set token over cookies
    res.setHeader(
      "Set-Cookie",
      `token=${payload?.token}; HttpOnly; Max-Age=${cognitoTokenResult?.exp}; Path=/;`
    );

    return res.json(cognitoTokenResult);
  } catch (error) {
    // console.log("Payload: ", req?.body);
    return res.status(500).json({
      message: error?.message || "Issue generating the token",
      status: error?.status || 500,
    });
  }
};

export default nc().post(handler);
