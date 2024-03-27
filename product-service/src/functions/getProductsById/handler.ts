import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { products, notFoundMessage } from '@constants';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const { productId } = event.pathParameters;
  const product = await products.find((product) => product.id === productId);

  if (!product) {
    return formatJSONResponse({
      message: notFoundMessage,
    }, 404);
  }

  return formatJSONResponse(product);
};

export const main = middyfy(getProductsById);
