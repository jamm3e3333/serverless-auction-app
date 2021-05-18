import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';
import { getAuctionById } from './getAuction.js';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const placeBid = async (event, context) => {
    const datetime = new Date().toISOString();
    const { id } = event.pathParameters;
    const { amount } = event.body;

    const auction = await getAuctionById(id);

    if(amount <= auction.highestBid.amount) {
        throw new createError.Forbidden(`Bid ${amount} must be higher than ${auction.highestBid.amount}.`);
    }

    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: {
            id
        },
        UpdateExpression: 'set highestBid.amount = :amount, updatedAt = :datetime',
        ExpressionAttributeValues: {
            ':amount': amount,
            ':datetime': datetime
        },
        ReturnValues: 'ALL_NEW'
    };

    try{
        const Items = await dynamoDB.update(params).promise()
        const response = {
            statusCode: 200,
            body: JSON.stringify(Items)
        }
        return response;
    }
    catch(err) {
        console.error(err);
        throw new createError.InternalServerError(err);
    }
}

export const handler = commonMiddleware(placeBid);