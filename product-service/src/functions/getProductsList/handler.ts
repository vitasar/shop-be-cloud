import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { DynamoDBClient, ScanCommand }  from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({});

const scanProducts = async () => {
  const command = new ScanCommand({
    TableName: process.env.PRODUCT_TABLE_NAME,
  })
  const products = await client.send(command);
  return products.Items.map((product) => unmarshall(product));
}

const scanStock = async () => {
  const command = new ScanCommand({
    TableName: process.env.STOCK_TABLE_NAME,
  })
  const stock = await client.send(command);
  return stock.Items.map((stockItem) => unmarshall(stockItem));
}

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const productList = JSON.parse(event.body as string)?.products || await scanProducts();
  const stock = JSON.parse(event.body as string)?.stock || await scanStock();

  const combinedResults = productList.map((product) => ({
    ...product,
    count: stock.find((stockItem) => stockItem.product_id === product.id)?.count,
  }));
  
  return formatJSONResponse(combinedResults);
};

export const main = middyfy(getProductsList);
