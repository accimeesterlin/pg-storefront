import moment from 'moment';
import Balance from '@models/balance.model';
import { db } from '../utils/authUtils';

const { BALANCE_TABLE_NAME } = process.env;

const balanceTable = BALANCE_TABLE_NAME;

export const increaseBalance = async (payload: Balance) => {
  try {
    const currentTime = moment.utc(new Date()).format();
    const setUpdatedAt = `updatedAt = :updatedAt`;
    let setBalance = `set amount = amount + :amount`;

    const id = payload?.id || payload?.userID;

    // Update user balance
    const balanceParams = {
      TableName: balanceTable,
      Key: { id },
      UpdateExpression: `${setBalance}, ${setUpdatedAt}`,
      ExpressionAttributeValues: {
        ":amount": Number(payload?.amount),
        ":updatedAt": currentTime,
      },
      ReturnValues: "ALL_NEW",
    };
    const response = await db.update(balanceParams).promise();
    const attributes = response?.Attributes;

    return attributes;
  } catch (error) {
    throw new Error(`increaseBalance ${error?.message}`);
  }
};


export const decreaseBalance = async (payload: Balance) => {
    try {
      const currentTime = moment.utc(new Date()).format();
      const setUpdatedAt = `updatedAt = :updatedAt`;
      let setBalance = `set amount = amount - :amount`;
  
      const id = payload?.id || payload?.userID;
  
      // Update user balance
      const balanceParams = {
        TableName: balanceTable,
        Key: { id },
        UpdateExpression: `${setBalance}, ${setUpdatedAt}`,
        ExpressionAttributeValues: {
          ":amount": Number(payload?.amount),
          ":updatedAt": currentTime,
        },
        ConditionExpression: "amount >= :amount",
        ReturnValues: "ALL_NEW",
      };
      const response = await db.update(balanceParams).promise();
      const attributes = response?.Attributes;
  
      return attributes;
    } catch (error) {
      throw new Error(`decreaseBalance ${error?.message}`);
    }
  };