import { ChainId } from '../../types';
import { CollectibleFilter } from '../order';
import { Offer, OfferSortBy } from './types';

// Get offer detail
export interface GetOfferParams {
  chainId: ChainId;
  hash: string;
}

export interface GetOfferResponse {
  order: Offer;
}

// Get token's offers
export interface GetOffersParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  from: number;
  size: number;
}

export interface GetOffersResponse {
  erc721Token: {
    offers: Offer[];
  };
}

// Get sent offers
export interface GetSentOffersParams {
  chainId: ChainId;
  from: number;
  size: number;
  account: string;
  collectibleFilters?: CollectibleFilter;
  isValid?: boolean | null;
  sort?: OfferSortBy | null;
}

export interface GetSentOffersResponse {
  sentOffers: {
    total: number;
    data: Offer[];
  };
}

export interface GetSentOffersResult {
  total: number;
  data: Offer[];
}

// Get received offers
export interface GetReceivedOffersParams {
  chainId: ChainId;
  from: number;
  size: number;
  account: string;
  collectibleFilters?: CollectibleFilter;
  sort?: OfferSortBy | null;
}

export interface GetReceivedOffersResponse {
  receivedOffers: {
    total: number;
    data: { highestOffer: Offer }[];
  };
}

export interface GetReceivedOffersResult {
  total: number;
  data: Offer[];
}

// Get offers amount
export interface GetOffersAmountParams {
  chainId: ChainId;
  account: string;
}

export interface GetOffersAmountResponse {
  receivedOffers: {
    total: number;
  };
  sentOffers: {
    total: number;
  };
}

export interface GetOffersAmountResult {
  receivedOffersAmount: number;
  sentOffersAmount: number;
}

export interface GetOfferByAddressParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  account: string;
}

export interface GetOfferByAddressResponse {
  erc721Token: {
    offerBy: Offer;
  };
}
