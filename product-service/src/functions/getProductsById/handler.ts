import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { DynamoDBClient, QueryCommand }  from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { notFoundMessage } from '../../constants';

const client = new DynamoDBClient({});

const queryProduct = async (productId: string) => {
  const command = new QueryCommand({
    TableName: process.env.PRODUCT_TABLE_NAME,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': { S: productId },
    },
  });
  const product = await client.send(command);
  return product.Items.map((product) => unmarshall(product));
}

const queryStock = async (productId: string) => {
  const command = new QueryCommand({
    TableName: process.env.STOCK_TABLE_NAME,
    KeyConditionExpression: 'product_id = :product_id',
    ExpressionAttributeValues: {
      ':product_id': { S: productId },
    },
  });
  const stock = await client.send(command);
  return stock.Items.map((stockItem) => unmarshall(stockItem));
}

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const { productId } = event.pathParameters;
  const productList = JSON.parse(event.body as string)?.products || await queryProduct(productId);
  
  if (!productList.length) {
    return formatJSONResponse({
      message: notFoundMessage,
    }, 404);
  }

  const stock = JSON.parse(event.body as string)?.stock || await queryStock(productId);
  const combinedResults = {
    ...productList[0],
    count: stock[0].count
  };

  return formatJSONResponse(combinedResults);
};

export const main = middyfy(getProductsById);
