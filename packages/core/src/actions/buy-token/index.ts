import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

import { SWAP_DEFAULT_SLIPPAGE, ZERO_ADDRESS } from '../../common';
import { Erc, getExchangeRate, getOrderByHash } from '../../queries';
import {
  checkIsErc721OrderValid,
  checkIsErc1155OrderValid,
  checkIsInsufficientBalance,
  getLiquidityProviderFee,
  getLiquidityProviderFeePercent,
  getPriceImpactPercent,
  getSettlePrice,
  getSwappedAmount,
  getTokensNeedToApprove,
  settleErc721Order,
  settleErc1155Order,
  swapRONAndSettleErc721Order,
  swapRONAndSettleErc1155Order,
  swapTokensAndSettleErc721Order,
  swapTokensAndSettleErc1155Order,
} from '../../services';
import { getPaymentToken, getPaymentTokens, getSwapConfig, Token, TokenData } from '../../services/tokens';
import { SwapTokenData } from '../../types';
import { convertAmountToUsd } from '../../utils/convertPrice';
import { BuyErc721TokenParams, BuyErc1155TokenParams, BuyTokenDataParams, GetSwapTokenDataParams } from './types';

export * from './types';

export const buyErc721Token = async (params: BuyErc721TokenParams) => {
  const { order, selectedTokenAddress, chainId, wallet, deadline, refAddress = ZERO_ADDRESS, options } = params;

  if (!order) {
    throw new Error('Order not found');
  }

  const { paymentToken: listingToken, currentPrice } = order;
  const { account } = wallet;

  const tokens = getPaymentTokens(chainId);
  const isBuyingWithListingToken = selectedTokenAddress.toLowerCase() === listingToken.toLowerCase();
  const isBuyingWithRonToken = selectedTokenAddress.toLowerCase() === tokens[Token.RON].address.toLowerCase();

  const swapConfig = getSwapConfig(chainId, listingToken);
  const tokenPaths = swapConfig[selectedTokenAddress]?.path;

  const settlePrice = await getSettlePrice(chainId, selectedTokenAddress, listingToken, currentPrice);
  if (!settlePrice) {
    throw new Error('Can not get settle price');
  }

  // Check order is valid
  const isOrderValid = await checkIsErc721OrderValid(chainId, order);
  if (!isOrderValid) {
    throw new Error('Invalid order');
  }

  // Check all tokens is approved
  const tokensNeedToApprove = await getTokensNeedToApprove(
    chainId,
    account,
    selectedTokenAddress,
    listingToken,
    settlePrice,
  );
  const isApprovedAllToken = tokensNeedToApprove.length === 0;
  if (!isApprovedAllToken) {
    const tokensNameNeedToApprove = tokensNeedToApprove.map(token => (token as TokenData).name);
    throw new Error(`Tokens need to approve: ${JSON.stringify(tokensNameNeedToApprove)}`);
  }

  // Check insufficient balance
  const isInsufficient = await checkIsInsufficientBalance(chainId, selectedTokenAddress, account, settlePrice);
  if (isInsufficient) {
    throw new Error('Insufficient balance');
  }

  // Settle order
  if (isBuyingWithListingToken) {
    return settleErc721Order(chainId, wallet, order, settlePrice, refAddress, options);
  }

  if (isBuyingWithRonToken) {
    return swapRONAndSettleErc721Order(chainId, wallet, order, settlePrice, tokenPaths, deadline, refAddress, options);
  }

  return swapTokensAndSettleErc721Order(chainId, wallet, order, settlePrice, tokenPaths, deadline, refAddress, options);
};

export const buyErc1155Token = async (params: BuyErc1155TokenParams) => {
  const {
    order,
    selectedTokenAddress,
    chainId,
    wallet,
    quantity,
    deadline,
    refAddress = ZERO_ADDRESS,
    options,
  } = params;

  if (!order) {
    throw new Error('Order not found');
  }

  const { paymentToken: listingToken, currentPrice } = order;
  const { account } = wallet;

  const totalPrice = BigNumber.from(currentPrice)
    .mul(Number(quantity || 0))
    .toString();

  const tokens = getPaymentTokens(chainId);
  const isBuyingWithListingToken = selectedTokenAddress.toLowerCase() === listingToken.toLowerCase();
  const isBuyingWithRonToken = selectedTokenAddress.toLowerCase() === tokens[Token.RON].address.toLowerCase();

  const swapConfig = getSwapConfig(chainId, listingToken);
  const tokenPaths = swapConfig[selectedTokenAddress]?.path;

  const settlePrice = await getSettlePrice(chainId, selectedTokenAddress, listingToken, totalPrice);
  if (!settlePrice) {
    throw new Error('Can not get settle price');
  }

  // Check order is valid
  const isOrderValid = await checkIsErc1155OrderValid(chainId, order);
  if (!isOrderValid) {
    throw new Error('Invalid order');
  }
  // Check all tokens is approved
  const tokensNeedToApprove = await getTokensNeedToApprove(
    chainId,
    account,
    selectedTokenAddress,
    listingToken,
    settlePrice,
  );
  const isApprovedAllToken = tokensNeedToApprove.length === 0;
  if (!isApprovedAllToken) {
    const tokensNameNeedToApprove = tokensNeedToApprove.map(token => (token as TokenData).name);
    throw new Error(`Tokens need to approve: ${JSON.stringify(tokensNameNeedToApprove)}`);
  }

  // Check insufficient balance
  const isInsufficient = await checkIsInsufficientBalance(chainId, selectedTokenAddress, account, settlePrice);
  if (isInsufficient) {
    throw new Error('Insufficient balance');
  }

  // Settle order
  if (isBuyingWithListingToken) {
    return settleErc1155Order(chainId, wallet, order, settlePrice, quantity, refAddress, options);
  }

  if (isBuyingWithRonToken) {
    return swapRONAndSettleErc1155Order(
      chainId,
      wallet,
      order,
      settlePrice,
      tokenPaths,
      quantity,
      deadline,
      refAddress,
      options,
    );
  }

  return swapTokensAndSettleErc1155Order(
    chainId,
    wallet,
    order,
    currentPrice,
    tokenPaths,
    quantity,
    deadline,
    refAddress,
    options,
  );
};

export const buyToken = async (params: BuyTokenDataParams) => {
  const { hash, ...otherParams } = params;
  const order = await getOrderByHash({ hash, chainId: params.chainId });
  if (!order) {
    throw new Error('Order not found');
  }

  const ercType = order.assets?.[0]?.erc;
  if (ercType === Erc.Erc721) {
    return buyErc721Token({ ...otherParams, order });
  }

  return buyErc1155Token({ quantity: 1, ...otherParams, order });
};

export const getSwapTokenData = async (params: GetSwapTokenDataParams) => {
  const { chainId, inputTokenAddress, outputTokenAddress, amount } = params;

  const exchangeRate = await getExchangeRate({ chainId });
  const inputTokenData = getPaymentToken(chainId, inputTokenAddress);
  const outputTokenData = getPaymentToken(chainId, outputTokenAddress);

  if (!inputTokenData) {
    throw new Error('Input token address is invalid');
  }

  if (!outputTokenData) {
    throw new Error('Output token address is invalid');
  }

  const swappedAmount = await getSwappedAmount(chainId, inputTokenAddress, outputTokenAddress, amount);
  const fiatValueIn = convertAmountToUsd(
    Number(formatUnits(BigNumber.from(amount), inputTokenData.decimals)),
    inputTokenData.symbol,
    exchangeRate,
  );
  const fiatValueOut = convertAmountToUsd(
    Number(formatUnits(BigNumber.from(swappedAmount), outputTokenData.decimals)),
    inputTokenData?.symbol,
    exchangeRate,
  );

  const liquidityProviderFee = getLiquidityProviderFee(chainId, inputTokenAddress, outputTokenAddress, amount);
  const liquidityProviderFeePercent = getLiquidityProviderFeePercent(chainId, inputTokenAddress, outputTokenAddress);
  const priceImpactPercent = await getPriceImpactPercent(
    chainId,
    inputTokenAddress,
    outputTokenAddress,
    fiatValueIn,
    fiatValueOut,
  );
  const maximumSent = await getSettlePrice(chainId, inputTokenAddress, outputTokenAddress, amount);

  return {
    swappedAmount: swappedAmount?.toString(),
    maximumSent,
    liquidityProviderFee,
    liquidityProviderFeePercent,
    priceImpactPercent,
    slippageTolerance: SWAP_DEFAULT_SLIPPAGE,
  } as SwapTokenData;
};
