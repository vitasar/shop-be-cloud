import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { DynamoDBClient }  from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const putProduct = async (product) => {
  const command = new PutCommand({
    TableName: process.env.PRODUCT_TABLE_NAME,
    Item: product,
  });
  const response = await docClient.send(command);
  return response;
}

export const createProduct: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const product = JSON.parse(event.body as string);
  const response = await putProduct(product);
  
  return formatJSONResponse(response);
};

export const main = middyfy(createProduct);
