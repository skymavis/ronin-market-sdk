import { Erc } from '../collection';
import { PublicProfile } from '../profile/types';
import { CommonTokenData } from '../token';

export enum OrderStatus {
  EXPIRED = 'EXPIRED',
  INVALID_ITEM_AMOUNT = 'INVALID_ITEM_AMOUNT',
  INVALID_WRON_APPROVE_AMOUNT = 'INVALID_WRON_APPROVE_AMOUNT',
  INVALID_WRON_INSUFFICIENT = 'INVALID_WRON_INSUFFICIENT',
  INVALID_WRON_INSUFFICIENT_AND_APPROVE_AMOUNT = 'INVALID_WRON_INSUFFICIENT_AND_APPROVE_AMOUNT',
  MATCHED = 'MATCHED',
  OFFERER_CANCEL = 'OFFERER_CANCEL',
  OPEN = 'OPEN',
  OPENED = 'OPENED',
  PARTIALLY_MATCHED = 'PARTIALLY_MATCHED',
  REVALID_WRON_SUFFICIENT = 'REVALID_WRON_SUFFICIENT',
}

export interface OrderQuantity {
  orderId: number;
  quantity: string;
  remainingQuantity: string;
  availableQuantity: string;
}

export enum OrderType {
  Offer = 'Offer',
  Sell = 'Sell',
}

export interface Asset {
  erc: Erc;
  address: string;
  id: string;
  quantity: number;
  token?: CommonTokenData;
}

export interface Order {
  id: number;
  maker: string;
  kind: OrderType;
  assets: Asset[];
  expiredAt: number;
  paymentToken: string;
  startedAt: number;
  basePrice: string;
  expectedState: string;
  nonce: number;
  marketFeePercentage: number;
  signature: string;
  hash: string;
  duration: number;
  timeLeft: number;
  currentPrice: string;
  suggestedPrice: string;
  makerProfile: PublicProfile | null;
  orderStatus: OrderStatus;
  orderQuantity: OrderQuantity | null;
}

export interface InputAsset {
  erc: Erc;
  address: string;
  id: string;
  quantity: string;
}

export interface InputOrder {
  kind: OrderType;
  assets: InputAsset[];
  expiredAt: number;
  paymentToken: string;
  startedAt: number;
  basePrice: string;
  expectedState: string;
  nonce: number;
}

export enum AuctionType {
  All = 'All',
  NotForSale = 'NotForSale',
  Sale = 'Sale',
}

export enum ListingSortBy {
  ExpiredAtAsc = 'ExpiredAtAsc',
  ExpiredAtDesc = 'ExpiredAtDesc',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
}

export interface CollectibleFilter {
  tokenAddresses: string[];
  erc?: Erc | null;
}
