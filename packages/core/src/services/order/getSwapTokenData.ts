import { formatUnits } from 'ethers/lib/utils';

import { createKatanaContract, createReadOnlyProvider } from '../../contracts';
import { ChainId } from '../../types';
import { getPaymentToken, getSwapConfig } from '../tokens';

export const getLiquidityProviderFeePercent = (
  chainId: ChainId,
  inputTokenAddress: string,
  outputTokenAddress: string,
) => {
  const swapConfig = getSwapConfig(chainId, outputTokenAddress)[inputTokenAddress];
  return swapConfig?.lpFeePercent;
};

export const getPriceImpactPercent = async (
  chainId: ChainId,
  inputTokenAddress: string,
  outputTokenAddress: string,
  fiatValueIn: number,
  fiatValueOut: number,
) => {
  const liquidityProviderPercent = getLiquidityProviderFeePercent(chainId, inputTokenAddress, outputTokenAddress);

  return (1 - fiatValueIn / fiatValueOut) * 100 - liquidityProviderPercent;
};

export const getLiquidityProviderFee = (
  chainId: ChainId,
  inputTokenAddress: string,
  outputTokenAddress: string,
  amountIn: string,
) => {
  const inputTokenData = getPaymentToken(chainId, inputTokenAddress);

  const formattedAmountIn = formatUnits(amountIn, inputTokenData?.decimals);
  const liquidityProviderPercent = getLiquidityProviderFeePercent(chainId, inputTokenAddress, outputTokenAddress);
  return {
    value: (Number(formattedAmountIn) * liquidityProviderPercent) / 100,
    symbol: inputTokenData?.symbol,
  };
};

export const getSwappedAmount = async (
  chainId: ChainId,
  inputTokenAddress: string,
  outputTokenAddress: string,
  amount: string,
) => {
  const readProvider = createReadOnlyProvider(chainId);
  const katanaContract = createKatanaContract(chainId);
  const swapConfig = getSwapConfig(chainId, outputTokenAddress);
  const path = swapConfig[inputTokenAddress]?.path;

  const response = await katanaContract.connect(readProvider).getAmountsIn(amount, path);

  return response?.[0];
};
