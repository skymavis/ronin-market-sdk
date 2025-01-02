import { ChainId } from '../../types';
import { paymentTokens } from './data';

export const getPaymentTokens = (chainId: ChainId) => {
  return paymentTokens[chainId];
};

export const getPaymentToken = (chainId: ChainId, tokenAddress: string) => {
  const tokens = getPaymentTokens(chainId);
  return Object.entries(tokens).find(([, value]) => value.address === tokenAddress)?.[1];
};
