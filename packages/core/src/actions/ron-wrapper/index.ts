import { parseUnits } from 'ethers/lib/utils';

import { createWRonContract } from '../../contracts';
import {
  checkIsInsufficientBalance,
  checkIsInsufficientOfferBalance,
  getPaymentTokens,
  Token,
  wRonToken,
} from '../../services';
import { WrapRonParams } from './types';

export * from './types';

export const wrapRon = async (params: WrapRonParams) => {
  const { chainId, wallet, amount, options } = params;
  const { account, provider } = wallet;

  const wRonContract = createWRonContract(chainId, provider);

  const ron = getPaymentTokens(chainId)[Token.RON];
  const formattedAmount = parseUnits(amount, ron.unit).toString();
  const isInsufficientBalance = await checkIsInsufficientBalance(chainId, ron.address, account, formattedAmount);

  if (isInsufficientBalance) {
    throw new Error('Insufficient balance');
  }

  return wRonContract.deposit({ value: formattedAmount, ...options });
};

export const unwrapRon = async (params: WrapRonParams) => {
  const { chainId, wallet, amount, options } = params;
  const { account, provider } = wallet;

  const wRonContract = createWRonContract(chainId, provider);

  const wRonUnit = wRonToken[chainId].unit;
  const formattedAmount = parseUnits(amount, wRonUnit).toString();
  const isInsufficientBalance = await checkIsInsufficientOfferBalance(chainId, account, formattedAmount);

  if (isInsufficientBalance) {
    throw new Error('Insufficient balance');
  }

  return wRonContract.withdraw(formattedAmount, { ...options });
};
