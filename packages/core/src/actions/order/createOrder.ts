import { BigNumber } from 'ethers';

import { MARKET_FEE_PERCENTAGE } from '../../common';
import { Erc, getTokenMetadata, OrderType, requestCreateOrder } from '../../queries';
import {
  checkIsErc721Approved,
  checkIsErc1155Approved,
  generateInputOrder,
  getErc721OrderSignature,
  getErc1155OrderSignature,
  getNonce,
} from '../../services';
import { AuctionData, Erc721Order, Erc1155Order, ErcAssetItem } from '../../types';
import { getOrderKind } from '../../utils';
import { CreateErc721OrderParams, CreateErc1155OrderParams, CreateOrderParams } from './types';

const generateErc721Order = (data: AuctionData) => {
  const { price, duration, orderType, assets, paymentToken, maker, expectedState } = data;

  const orderKind = getOrderKind(orderType);

  const now = new Date().getTime();
  const startedAt = Math.ceil(now / 1000);
  const expiredAt = startedAt + duration;

  const result: Erc721Order = {
    maker,
    kind: orderKind,
    assets,
    expiredAt,
    paymentToken,
    startedAt,
    basePrice: price.toString(),
    endedAt: 0,
    endedPrice: '0',
    expectedState,
    nonce: 0,
    marketFeePercentage: MARKET_FEE_PERCENTAGE,
  };

  return result;
};

const generateErc1155Order = (data: AuctionData) => {
  const { price, duration, orderType, assets, paymentToken, maker, expectedState } = data;

  const orderKind = getOrderKind(orderType);

  const now = new Date().getTime();
  const startedAt = Math.ceil(now / 1000);
  const expiredAt = startedAt + duration;

  const result: Erc1155Order = {
    maker,
    kind: orderKind,
    asset: assets[0],
    expiredAt,
    paymentToken,
    startedAt,
    unitPrice: price.toString(),
    endedAt: 0,
    endedUnitPrice: '0',
    expectedState,
    nonce: 0,
  };

  return result;
};

export const createErc721Order = async (params: CreateErc721OrderParams) => {
  const { chainId, wallet, tokenAddress, tokenId, paymentToken, price, duration } = params;
  const { signer, account } = wallet;

  const isApproved = checkIsErc721Approved(chainId, account, tokenAddress);
  const assets = [
    {
      id: tokenId,
      addr: tokenAddress,
      erc: ErcAssetItem.Erc721,
      quantity: 0,
    },
  ];

  if (!isApproved) {
    throw new Error('This Erc721 tokens to be approved');
  }

  const nonce = await getNonce(chainId, account);
  const expectedState = '0';
  const auctionData = {
    price: BigNumber.from(price),
    duration,
    paymentToken,
    orderType: OrderType.Sell,
    expectedState,
    nonce,
    maker: account,
    assets,
  };

  const inputOrder = generateInputOrder(auctionData);
  const dataForSigning = generateErc721Order(auctionData);

  const signature = await getErc721OrderSignature(chainId, signer, dataForSigning);

  if (!signature) {
    throw new Error('Invalid signature');
  }

  return requestCreateOrder({ order: inputOrder, signature, account, chainId });
};

export const createErc1155Order = async (params: CreateErc1155OrderParams) => {
  const { chainId, wallet, tokenAddress, tokenId, paymentToken, price, duration, quantity } = params;
  const { signer, account } = wallet;

  const isApproved = checkIsErc1155Approved(chainId, account, tokenAddress);
  const assets = [
    {
      id: tokenId,
      addr: tokenAddress,
      erc: ErcAssetItem.Erc1155,
      quantity,
    },
  ];

  if (!isApproved) {
    throw new Error('This Erc1155 needs to be approved');
  }

  const nonce = await getNonce(chainId, account);
  const expectedState = '0';
  const auctionData = {
    price: BigNumber.from(price),
    duration,
    paymentToken,
    orderType: OrderType.Sell,
    expectedState,
    nonce,
    maker: account,
    assets,
  };

  const inputOrder = generateInputOrder(auctionData);
  const dataForSigning = generateErc1155Order(auctionData);

  const signature = await getErc1155OrderSignature(chainId, signer, dataForSigning);

  if (!signature) {
    throw new Error('Invalid signature');
  }

  return requestCreateOrder({ order: inputOrder, signature, account, chainId });
};

export const createOrder = async (params: CreateOrderParams) => {
  const { chainId, tokenAddress } = params;
  const tokenMetadata = await getTokenMetadata({ showAttributes: false, chainId: chainId, tokenAddress: tokenAddress });
  const { erc } = tokenMetadata;

  if (erc === Erc.Erc721) {
    return createErc721Order(params);
  }

  return createErc1155Order({ quantity: 1, ...params });
};
