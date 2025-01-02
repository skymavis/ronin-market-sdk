import { BigNumber } from 'ethers';

import { ChainId } from '../../types';
import { fetchOfferBalance, fetchPaymentTokenBalance } from './fetchBalances';

export const checkIsInsufficientBalance = async (
  chainId: ChainId,
  tokenAddress: string,
  account: string,
  amount: string,
) => {
  const currentBalance = await fetchPaymentTokenBalance(chainId, tokenAddress, account);
  return BigNumber.from(amount).gt(currentBalance);
};

export const checkIsInsufficientOfferBalance = async (chainId: ChainId, account: string, amount: string) => {
  const wRonBalance = await fetchOfferBalance(chainId, account);
  return BigNumber.from(amount).gt(wRonBalance);
};
