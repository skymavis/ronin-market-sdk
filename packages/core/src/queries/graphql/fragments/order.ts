import { gql } from 'graphql-request';

import { PublicProfileFragment } from './profile';

export const AssetFragment = gql`
  fragment Asset on Asset {
    erc
    address
    id
    quantity
  }
`;

export const OrderFragment = gql`
  fragment Order on Order {
    id
    maker
    kind
    assets {
      ...Asset
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
  ${AssetFragment}
  ${PublicProfileFragment}
`;
