import { gql } from 'graphql-request';

import { PublicProfileFragment } from './profile';

export const AssetOfferFragment = gql`
  fragment AssetOffer on Asset {
    erc
    address
    id
    quantity
    token {
      ... on Erc721 {
        tokenId
        tokenAddress
        name
        image
        cdnImage
        collectionMetadata
      }
    }
  }
`;

export const OfferFragment = gql`
  fragment Offer on Order {
    id
    maker
    kind
    assets {
      ...AssetOffer
    }
    expiredAt
    paymentToken
    startedAt
    basePrice
    expectedState
    nonce
    marketFeePercentage
    signature
    hash
    duration
    timeLeft
    currentPrice
    suggestedPrice
    makerProfile {
      ...PublicProfile
    }
    orderStatus
    orderQuantity {
      orderId
      quantity
      remainingQuantity
      availableQuantity
    }
  }
  ${AssetOfferFragment}
  ${PublicProfileFragment}
`;
