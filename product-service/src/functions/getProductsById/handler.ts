import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import { products, notFoundMessage } from '../../constants';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const { productId } = event.pathParameters;
  const productList = await JSON.parse(event.body as string) || products;
  const product = await productList.find((product) => product.id === productId);

  if (!product) {
    return formatJSONResponse({
      message: notFoundMessage,
    }, 404);
  }

  return formatJSONResponse(product);
};

export const main = middyfy(getProductsById);
