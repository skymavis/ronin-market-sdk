import { Erc } from '../collection';
import { PublicProfile } from '../profile/types';
import { CommonTokenData } from '../token';

export enum OrderStatus {
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  INVALID_ITEM_AMOUNT = 'INVALID_ITEM_AMOUNT',
  INVALID_ITEM_AMOUNT_AND_UNAPPROVED_ITEM = 'INVALID_ITEM_AMOUNT_AND_UNAPPROVED_ITEM',
  INVALID_WRON_APPROVE_AMOUNT = 'INVALID_WRON_APPROVE_AMOUNT',
  INVALID_WRON_INSUFFICIENT = 'INVALID_WRON_INSUFFICIENT',
  INVALID_WRON_INSUFFICIENT_AND_APPROVE_AMOUNT = 'INVALID_WRON_INSUFFICIENT_AND_APPROVE_AMOUNT',
  LOCKED_ITEM = 'LOCKED_ITEM',
  MATCHED = 'MATCHED',
  OFFERER_CANCEL = 'OFFERER_CANCEL',
  OPEN = 'OPEN',
  OPENED = 'OPENED',
  PARTIALLY_CANCELLED = 'PARTIALLY_CANCELLED',
  PARTIALLY_EXPIRED = 'PARTIALLY_EXPIRED',
  PARTIALLY_MATCHED = 'PARTIALLY_MATCHED',
  PASIVELY_CANCELLED = 'PASIVELY_CANCELLED',
  REOPEN = 'REOPEN',
  REVALID_WRON_SUFFICIENT = 'REVALID_WRON_SUFFICIENT',
  TRANSFERRED_ITEM = 'TRANSFERRED_ITEM',
  UNAPPROVED_ITEM = 'UNAPPROVED_ITEM',
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
