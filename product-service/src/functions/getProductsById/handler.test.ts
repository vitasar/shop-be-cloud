import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { getProductsById } from './handler';

describe('getProductsById', () => {
  it('should return the product when it exists', async () => {
    const productId = '123';
    const products = [
      { id: productId, name: 'Product 1' },
      { id: '456', name: 'Product 2' },
    ].filter((product) => product.id === productId);
    
    const stock = [
      { product_id: '123', count: '1' },
      { product_id: '456', count: '2' },
    ];

    const output = products.map(item => ({...item, count: stock.find(stockItem => stockItem.product_id === item.id)?.count}))[0];

    const event: APIGatewayProxyEvent = {
      "resource": "/products/{productId}",
      "path": `/products/${productId}`,
      "httpMethod": "GET",
      "headers": {},
      "body": JSON.stringify({products, stock}),
      "isBase64Encoded": false,
      "requestContext": null,
      "multiValueHeaders": null,
      "queryStringParameters": null,
      "multiValueQueryStringParameters": null,
      "pathParameters": {
        productId
      },
      "stageVariables": null
    };    


    const result = await getProductsById(event, {} as Context, {} as Callback);
    if (!result) {
      throw new Error('Result is undefined');
    }
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(output));
  });

  it('should return 404 when the product does not exist', async () => {
    const productId = '789';
    const products = [
      { id: '123', name: 'Product 1' },
      { id: '456', name: 'Product 2' },
    ].filter((product) => product.id === productId);

    const stock = [
      { product_id: '123', count: '1' },
      { product_id: '456', count: '2' },
    ];

    const event: APIGatewayProxyEvent = {
      "resource": "/products/{productId}",
      "path": `/products/${productId}`,
      "httpMethod": "GET",
      "headers": {},
      "body": JSON.stringify({products, stock}),
      "isBase64Encoded": false,
      "requestContext": null,
      "multiValueHeaders": null,
      "queryStringParameters": null,
      "multiValueQueryStringParameters": null,
      "pathParameters": {
        productId
      },
      "stageVariables": null
    };    

    const result = await getProductsById(event, {} as Context, {} as Callback);
    if (!result) {
      throw new Error('Result is undefined');
    }
    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual(JSON.stringify({ message: 'Product not found' }));
  });
});