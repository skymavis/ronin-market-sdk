import { gql } from 'graphql-request';

import { OfferFragment } from '../fragments/offer';

export const GET_OFFER_BY_HASH = gql`
  query GetOfferByHash($hash: String!) {
    order(hash: $hash) {
      ...Offer
    }
  }
  ${OfferFragment}
`;

export const GET_OFFER_BY_ADDRESS = gql`
  query GetOfferByAddress($tokenAddress: String!, $tokenId: String!, $roninAddress: String!) {
    erc721Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      offerBy(roninAddress: $roninAddress) {
        ...Offer
      }
    }
  }
  ${OfferFragment}
`;

export const GET_OFFERS = gql`
  query GetOffers($tokenAddress: String!, $tokenId: String!, $from: Int!, $size: Int!) {
    erc721Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      offers(from: $from, size: $size) {
        ...Offer
      }
    }
  }
  ${OfferFragment}
`;

export const GET_SENT_OFFERS = gql`
  query GetSentOffers(
    $from: Int!
    $size: Int!
    $isValid: Boolean
    $sort: OfferSortBy
    $collectibleFilters: CollectibleFilter!
    $roninAddress: String
  ) {
    sentOffers(
      collectibleFilters: $collectibleFilters
      from: $from
      size: $size
      sort: $sort
      isValid: $isValid
      roninAddress: $roninAddress
    ) {
      total
      data {
        ...Offer
      }
    }
  }
  ${OfferFragment}
`;

export const GET_RECEIVED_OFFERS = gql`
  query GetReceivedOffers(
    $from: Int!
    $size: Int!
    $sort: OfferSortBy
    $collectibleFilters: CollectibleFilter!
    $roninAddress: String
  ) {
    receivedOffers(
      collectibleFilters: $collectibleFilters
      from: $from
      size: $size
      sort: $sort
      roninAddress: $roninAddress
    ) {
      total
      data {
        ... on Erc721 {
          highestOffer {
            ...Offer
          }
        }
      }
    }
  }
  ${OfferFragment}
`;

export const GET_OFFERS_AMOUNT = gql`
  query GetOffersAmount($roninAddress: String) {
    receivedOffers(from: 0, size: 1, roninAddress: $roninAddress) {
      total
    }
    sentOffers(from: 0, size: 1, roninAddress: $roninAddress) {
      total
    }
  }
`;
