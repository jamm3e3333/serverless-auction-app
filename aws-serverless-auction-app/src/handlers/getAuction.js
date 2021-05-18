import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const getAuctionById = async(id) => {
    let auction;
    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: {
            id
        }
    };
    try{
        const Item = await dynamoDB.get(params).promise();
        auction = Item.Item;
    }
    catch(err) {
        console.error(err);
        throw new createError.InternalServerError();
    }

    if(!auction) {
        throw new createError.NotFound(`${id} not found`);
    }

    return auction;
}

const getAuction = async (event, context) => {
    const { id } = event.pathParameters;
    const auction = await getAuctionById(id);

    const response = {
        statusCode: 200,
        body: JSON.stringify(auction)
    };
    
    return response;
}

export const handler = commonMiddleware(getAuction);