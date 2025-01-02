import { ethers } from 'ethers';

import { SWAP_DEFAULT_SLIPPAGE } from '../../common/constants';
import { createErc1155MarketGatewayContract, createMarketGatewayContract } from '../../contracts';
import { Order } from '../../queries';
import { ChainId, WalletClient } from '../../types';
import { generateErc721Order, generateErc1155Order } from './generateOrderData';
import { getSwappedAmount } from './getSwapTokenData';

export const getSettlePrice = async (
  chainId: ChainId,
  selectedTokenAddress: string,
  listingTokenAddress: string,
  amount: string,
) => {
  const isBuyingWithListingToken = selectedTokenAddress.toLowerCase() === listingTokenAddress.toLowerCase();

  if (isBuyingWithListingToken) {
    return amount;
  }

  const swappedAmount = await getSwappedAmount(chainId, selectedTokenAddress, listingTokenAddress, amount);
  return swappedAmount
    ?.mul(100 + SWAP_DEFAULT_SLIPPAGE)
    .div(100)
    .toString();
};

// Erc721
export const settleErc721Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const { signature, expectedState } = order;

  const marketGatewayContract = createMarketGatewayContract(chainId, provider);
  const erc721Order = generateErc721Order(order);

  return marketGatewayContract.settleOrder({
    expectedState,
    settlePrice,
    account,
    signature,
    chainId,
    referralAddr,
    order: erc721Order,
    options,
  });
};

export const swapTokensAndSettleErc721Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  tokenPaths: string[],
  deadline: string,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const marketGatewayContract = createMarketGatewayContract(chainId, provider);
  const erc721Order = generateErc721Order(order);

  const { signature, expectedState } = order;

  return marketGatewayContract.swapTokensAndSettleOrder({
    expectedState,
    settlePrice,
    path: tokenPaths,
    signature,
    account,
    referralAddr,
    deadline,
    order: erc721Order,
    options,
  });
};

export const swapRONAndSettleErc721Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  tokenPaths: string[],
  deadline: string,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const marketGatewayContract = createMarketGatewayContract(chainId, provider);
  const erc721Order = generateErc721Order(order);

  const { signature, expectedState } = order;

  return marketGatewayContract.swapRONAndSettleOrder({
    expectedState,
    settlePrice,
    referralAddr,
    path: tokenPaths,
    signature,
    account,
    deadline,
    order: erc721Order,
    options,
  });
};

// Erc1155
export const settleErc1155Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  quantity: number,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId, provider);
  const erc1155Order = generateErc1155Order(order);

  const { signature, expectedState } = order;

  return erc1155MarketGatewayContract.settleErc1155Order({
    expectedState,
    settlePrice,
    account,
    signature,
    chainId,
    referralAddr,
    quantity,
    order: erc1155Order,
    options,
  });
};

export const swapTokensAndSettleErc1155Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  tokenPaths: string[],
  quantity: number,
  deadline: string,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId, provider);
  const erc1155Order = generateErc1155Order(order);

  const { signature, expectedState } = order;

  return erc1155MarketGatewayContract.swapTokensAndSettleErc1155Order({
    expectedState,
    settlePrice,
    path: tokenPaths,
    signature,
    account,
    referralAddr,
    deadline,
    quantity,
    order: erc1155Order,
    options,
  });
};

export const swapRONAndSettleErc1155Order = (
  chainId: ChainId,
  wallet: WalletClient,
  order: Order,
  settlePrice: string,
  tokenPaths: string[],
  quantity: number,
  deadline: string,
  referralAddr: string,
  options?: ethers.Overrides,
) => {
  const { provider, account } = wallet;
  const erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId, provider);
  const erc1155Order = generateErc1155Order(order);

  const { signature, expectedState } = order;

  return erc1155MarketGatewayContract.swapRONAndSettleErc1155Order({
    expectedState,
    settlePrice,
    referralAddr,
    path: tokenPaths,
    signature,
    account,
    deadline,
    quantity,
    order: erc1155Order,
    options,
  });
};
