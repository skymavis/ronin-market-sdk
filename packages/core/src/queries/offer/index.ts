import { graphQLRequest } from '../graphql';
import {
  GET_OFFER_BY_ADDRESS,
  GET_OFFER_BY_HASH,
  GET_OFFERS,
  GET_OFFERS_AMOUNT,
  GET_RECEIVED_OFFERS,
  GET_SENT_OFFERS,
} from '../graphql/queries/offer';
import {
  GetOfferByAddressParams,
  GetOfferByAddressResponse,
  GetOfferParams,
  GetOfferResponse,
  GetOffersAmountParams,
  GetOffersAmountResponse,
  GetOffersParams,
  GetOffersResponse,
  GetReceivedOffersParams,
  GetReceivedOffersResponse,
  GetSentOffersParams,
  GetSentOffersResponse,
} from './queryTypes';
import { OfferSortBy } from './types';

export * from './queryTypes';
export * from './types';

export const getOffer = (params: GetOfferParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetOfferResponse>({
    query: GET_OFFER_BY_HASH,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.order);
};

export const getOffers = (params: GetOffersParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetOffersResponse>({
    query: GET_OFFERS,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.erc721Token?.offers);
};

export const getSentOffers = (params: GetSentOffersParams) => {
  const { chainId, account, ...otherParams } = params;
  const variables = {
    sort: OfferSortBy.ExpiredAtAsc,
    collectibleFilters: {
      tokenAddresses: [],
    },
    roninAddress: account,
    ...otherParams,
  };
  return graphQLRequest<GetSentOffersResponse>({
    query: GET_SENT_OFFERS,
    variables,
    chainId,
  }).then(response => response?.sentOffers);
};

// Get received offers
export const getReceivedOffers = (params: GetReceivedOffersParams) => {
  const { chainId, account, ...otherParams } = params;
  const variables = {
    sort: OfferSortBy.ExpiredAtAsc,
    collectibleFilters: {
      tokenAddresses: [],
    },
    roninAddress: account,
    ...otherParams,
  };
  return graphQLRequest<GetReceivedOffersResponse>({
    query: GET_RECEIVED_OFFERS,
    variables,
    chainId,
  }).then(response => {
    const { data, total } = response?.receivedOffers || {};
    const receivedOffers = (data || []).map(offer => offer.highestOffer);

    return {
      total: total || 0,
      data: receivedOffers,
    };
  });
};

export const getOffersAmount = (params: GetOffersAmountParams) => {
  const { chainId, account } = params;
  return graphQLRequest<GetOffersAmountResponse>({
    query: GET_OFFERS_AMOUNT,
    variables: { roninAddress: account },
    chainId,
  }).then(response => ({
    receivedOffersAmount: response?.receivedOffers?.total || 0,
    sentOffersAmount: response?.sentOffers?.total || 0,
  }));
};

export const getOfferByAddress = (params: GetOfferByAddressParams) => {
  const { chainId, account, ...otherParams } = params;
  return graphQLRequest<GetOfferByAddressResponse>({
    query: GET_OFFER_BY_ADDRESS,
    variables: { roninAddress: account, ...otherParams },
    chainId,
  }).then(response => response.erc721Token.offerBy);
};
