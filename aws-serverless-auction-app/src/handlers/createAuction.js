const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const hello = async(event, context) => {
  const datetime = new Date().toISOString();
  const id = uuid.v1();
  const { title } = JSON.parse(event.body);
  
  const auction = {
    id,
    title,
    status: 'open',
    createdAt: datetime
  };

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction)
   };
}

export const handler = hello;


