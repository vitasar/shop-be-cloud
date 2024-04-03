import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import { products } from '../../constants';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<object> = async (event) => {
  const productList = await JSON.parse(event.body as string) || products;
  return formatJSONResponse(productList);
};

export const main = middyfy(getProductsList);
