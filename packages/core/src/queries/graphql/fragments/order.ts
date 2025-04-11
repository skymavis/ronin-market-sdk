import { gql } from 'graphql-request';

import { PublicProfileFragment } from './profile';
import { AssetFragment } from './asset';

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

export const OrderInfoFragment = gql`
  fragment OrderInfo on Order {
    id
    maker
    kind
    assets {
      ...AssetInfo
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
      ...PublicProfileBrief
    }
    orderStatus
    orderQuantity {
      orderId
      quantity
      remainingQuantity
      availableQuantity
    }
  }
`;
