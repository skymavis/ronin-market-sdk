import { ExchangeRate } from '../queries';
import { getRate } from './mapData';

export const convertAmountToUsd = (amount: number, tokenSymbol: string, exchangeRate?: ExchangeRate) => {
  if (!exchangeRate || !amount) {
    return 0;
  }

  const rate = getRate(tokenSymbol, exchangeRate);
  return amount * rate;
};
