import { v1 as uuid } from 'uuid'; 
import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createAuction = async(event, context) => {
  const datetime = new Date().toISOString();
  const id = uuid();
  const { title } = event.body;
  
  const auction = {
    id,
    createdAt: datetime,
    updatedAt: datetime,
    title,
    status: 'open',
    highestBid: {
      amount: 0
    }
  };

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction
  };

  try{
    await dynamoDB.put(params).promise();
    const response = {
      statusCode: 201,
      body: JSON.stringify(auction)
    };

    return response;
  }
  catch(err){
    console.error(err);
    throw new createError.InternalServerError(err);
  }
}

export const handler = commonMiddleware(createAuction);


