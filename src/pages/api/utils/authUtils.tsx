import AWS from "aws-sdk";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const { DB_KEY, DB_SECRET_KEY, AWS_S3_BUCKET_NAME } = process.env;

AWS.config.update({
  accessKeyId: DB_KEY,
  secretAccessKey: DB_SECRET_KEY,
  apiVersion: "latest",
  region: "us-east-1",
});

export const db = new AWS.DynamoDB.DocumentClient({
  apiVersion: "latest",
});

export const verifyCognitoToken = async (token) => {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process?.env?.USER_POOL_ID || "us-east-1_y6izwmTnM",
    tokenUse: "access",
    clientId: process.env.COGNITO_CLIENT_ID || "49ubbk7f7ql1soacv4jmm3psh0",
  });

  try {
    const payload = await verifier.verify(token);
    return payload;
  } catch (error) {
    throw new Error(error?.message || "Token not valid!");
  }
};

export const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: DB_KEY,
  secretAccessKey: DB_SECRET_KEY,
  params: { Bucket: AWS_S3_BUCKET_NAME },
});
