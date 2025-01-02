import { ChainId } from '../../types';
import { ExchangeRate } from './types';

export interface GetExchangeRateParams {
  chainId: ChainId;
}

export interface GetExchangeRateResponse {
  exchangeRate: ExchangeRate;
}
