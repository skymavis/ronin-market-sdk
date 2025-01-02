import { BigNumber } from 'ethers';

import { OrderType } from '../queries';
import { Order } from '../queries/order/types';

export interface AuctionData {
  price: BigNumber;
  duration: number; // seconds
  paymentToken: string;
  orderType: OrderType;
  expectedState: string;
  nonce: number;
  maker: string;
  assets: OrderAssetItem[];
}

export enum ErcAssetItem {
  Erc20 = 0,
  Erc721 = 1,
  Erc1155 = 2,
}

export enum OrderKind {
  Offer = 0,
  Sell = 1,
}

export interface OrderAssetItem {
  erc: ErcAssetItem;
  addr: string;
  id: string;
  quantity: number;
}

export interface Erc721Order {
  maker: string;
  kind: OrderKind;
  assets: OrderAssetItem[];
  expiredAt: number;
  paymentToken: string;
  startedAt: number;
  basePrice: string;
  endedAt: number;
  endedPrice: string;
  expectedState: string;
  nonce: number;
  marketFeePercentage: number;
}

export interface Erc1155Order {
  maker: string;
  kind: OrderKind;
  asset: OrderAssetItem;
  expiredAt: number;
  paymentToken: string;
  startedAt: number;
  unitPrice: string;
  endedAt: number;
  endedUnitPrice: string;
  expectedState: string;
  nonce: number;
}

export interface SwapTokenData {
  swappedAmount: string;
  maximumSent: string;
  liquidityProviderFee: LiquidityProviderFee;
  liquidityProviderFeePercent: number;
  priceImpactPercent: number;
  slippageTolerance: number;
}

export interface LiquidityProviderFee {
  value: number;
  symbol: string;
}

export interface BulkBuyOrderData {
  quantity: number;
  order: Order;
}
