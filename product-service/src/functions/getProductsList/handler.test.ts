import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProductsList } from './handler';

describe('getProductsList', () => {
  it('should return the product list', async () => {
    const products = [
      { id: '123', name: 'Product 1' },
      { id: '456', name: 'Product 2' },
    ];
    const stock = [
      { product_id: '123', count: '1' },
      { product_id: '456', count: '2' },
    ];
    const output = products.map(item => ({...item, count: stock.find(stockItem => stockItem.product_id === item.id)?.count}));

    const event: APIGatewayProxyEvent = {
      "resource": "/products",
      "path": "/products",
      "httpMethod": "GET",
      "headers": {},
      "body": JSON.stringify({products, stock}),
      "isBase64Encoded": false,
      "requestContext": null,
      "multiValueHeaders": null,
      "queryStringParameters": null,
      "multiValueQueryStringParameters": null,
      "pathParameters": null,
      "stageVariables": null
    };

    const result: APIGatewayProxyResult | void = await getProductsList(event, {} as any, {} as any);
    if (!result) {
      throw new Error('Result is undefined');
    }
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(output));
  });
});