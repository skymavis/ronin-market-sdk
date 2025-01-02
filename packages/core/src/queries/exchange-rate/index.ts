import { graphQLRequest } from '../graphql';
import { GET_EXCHANGE_RATE } from '../graphql/queries/exchange-rate';
import { GetExchangeRateParams, GetExchangeRateResponse } from './queryTypes';

export * from './queryTypes';
export * from './types';

export const getExchangeRate = (params: GetExchangeRateParams) => {
  const { chainId } = params;

  return graphQLRequest<GetExchangeRateResponse>({ query: GET_EXCHANGE_RATE, chainId }).then(
    response => response.exchangeRate,
  );
};
