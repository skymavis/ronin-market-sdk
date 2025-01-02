import { BigNumber } from 'ethers';

import { MARKET_FEE_PERCENTAGE } from '../../common';
import { OrderType, requestCreateOrder } from '../../queries';
import {
  checkIsInsufficientOfferBalance,
  checkIsWRonTokenApproved,
  generateInputOrder,
  getErc721OrderSignature,
  getNonce,
  wRonToken,
} from '../../services';
import { ChainId, ErcAssetItem, OrderAssetItem, OrderKind, WalletClient } from '../../types';
import { MakeOfferParams } from './types';

const getInputOrder = async (
  chainId: ChainId,
  account: string,
  price: string,
  duration: number,
  expectedState: string,
  assets: OrderAssetItem[],
) => {
  const wRonAddress = wRonToken[chainId].address;
  const nonce = await getNonce(chainId, account);

  return generateInputOrder({
    price: BigNumber.from(price),
    duration,
    paymentToken: wRonAddress,
    orderType: OrderType.Offer,
    expectedState,
    nonce,
    maker: account,
    assets,
  });
};

const getOrderSignature = (
  chainId: ChainId,
  wallet: WalletClient,
  price: string,
  duration: number,
  expectedState: string,
  assets: OrderAssetItem[],
) => {
  const { account, signer } = wallet;

  const wRonAddress = wRonToken[chainId].address;
  const now = new Date().getTime();
  const startedAt = Math.ceil(now / 1000);
  const expiredAt = startedAt + duration;

  const dataForSigning = {
    maker: account,
    kind: OrderKind.Offer,
    assets,
    expiredAt,
    paymentToken: wRonAddress,
    startedAt,
    basePrice: price,
    endedAt: 0,
    endedPrice: '0',
    expectedState,
    nonce: 0,
    marketFeePercentage: MARKET_FEE_PERCENTAGE,
  };

  return getErc721OrderSignature(chainId, signer, dataForSigning);
};

export const makeOffer = async (params: MakeOfferParams) => {
  const { tokenId, tokenAddress, price, duration, chainId, wallet } = params;
  const { account } = wallet;

  const assets = [
    {
      id: tokenId,
      addr: tokenAddress,
      erc: ErcAssetItem.Erc721,
      quantity: 0,
    },
  ];

  const isWRonApproved = checkIsWRonTokenApproved(chainId, account, price);
  if (!isWRonApproved) {
    throw new Error('WRon need to be approved');
  }

  const isInsufficient = await checkIsInsufficientOfferBalance(chainId, account, price);
  if (isInsufficient) {
    throw new Error('Insufficient balance');
  }

  const expectedState = '0';

  const inputOrder = await getInputOrder(chainId, account, price, duration, expectedState, assets);
  const signature = await getOrderSignature(chainId, wallet, price, duration, expectedState, assets);

  if (!signature) {
    throw new Error('Invalid signature');
  }

  return requestCreateOrder({ order: inputOrder, account, signature, chainId });
};
