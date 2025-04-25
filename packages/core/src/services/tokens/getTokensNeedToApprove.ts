import { ChainId, SpenderContractType } from '../../types';
import { checkIsErc20Approved } from './checkIsTokenApproved';
import { getSwapConfig } from './configs';
import { TokenData } from './data';
import { getPaymentToken } from './getPaymentTokens';

export const getTokensNeedToApprove = async (
  chainId: ChainId,
  account: string,
  inputTokenAddress: string,
  outputTokenAddress: string,
  amount: string,
  spenderContract?: SpenderContractType,
) => {
  if (inputTokenAddress.toLowerCase() === outputTokenAddress.toLowerCase()) {
    const isAllowed = await checkIsErc20Approved(chainId, account, inputTokenAddress, amount, spenderContract);
    const paymentToken = getPaymentToken(chainId, inputTokenAddress);
    return isAllowed ? [] : [paymentToken];
  }

  const swapConfig = getSwapConfig(chainId, outputTokenAddress);
  const tokens = swapConfig[inputTokenAddress]?.tokens || [];

  const tokensNeedToApprove = await tokens.reduce(async (results, currentToken) => {
    const isAllowed = await checkIsErc20Approved(chainId, account, currentToken.address, amount, spenderContract);
    const tokensData = await results;
    if (!isAllowed) {
      return [...tokensData, currentToken];
    }

    return results;
  }, Promise.resolve([] as TokenData[]));

  return tokensNeedToApprove;
};
