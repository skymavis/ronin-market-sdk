import { Asset, OrderQuantity, OrderStatus, OrderType } from '../order';
import { PublicProfile } from '../profile';

export interface Offer {
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

export enum OfferSortBy {
  Earliest = 'Earliest',
  ExpiredAtAsc = 'ExpiredAtAsc',
  ExpiredAtDesc = 'ExpiredAtDesc',
  Latest = 'Latest',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
}
