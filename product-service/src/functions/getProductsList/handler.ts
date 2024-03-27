import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { products } from '@constants';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<object> = async () => {
  const productList = await products;
  return formatJSONResponse(productList);
};

export const main = middyfy(getProductsList);
