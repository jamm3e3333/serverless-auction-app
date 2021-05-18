import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getAuctions = async (event, context) => {
    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME
    }

    try{
        const Items = await dynamoDB.scan(params)
                        .promise()
        const response = {
            statusCode: 200,
            body: JSON.stringify(Items)
        }
        return response;
    }
    catch(err) {
        console.error(err);
        throw new createError.InternalServerError();
    }

}

export const handler = commonMiddleware(getAuctions);