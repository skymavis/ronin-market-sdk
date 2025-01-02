import { createErc20Contract, createReadOnlyProvider, createWRonContract } from '../../contracts';
import { ChainId } from '../../types';
import { getPaymentTokens, Token } from '../tokens';

export const fetchOfferBalance = (chainId: ChainId, account: string) => {
  const wRonContract = createWRonContract(chainId);
  const readProvider = createReadOnlyProvider(chainId);

  return wRonContract.connect(readProvider).balanceOf(account);
};

export const fetchPaymentTokenBalance = (chainId: ChainId, tokenAddress: string, account: string) => {
  const paymentTokens = getPaymentTokens(chainId);
  const erc20Contract = createErc20Contract(tokenAddress);
  const readProvider = createReadOnlyProvider(chainId);

  const isRon = paymentTokens[Token.RON].address.toLowerCase() === tokenAddress.toLowerCase();
  if (isRon) {
    return readProvider.getBalance(account);
  }

  return erc20Contract.connect(readProvider).balanceOf(account);
};
