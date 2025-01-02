import { gql } from 'graphql-request';

import { OrderFragment } from './order';
import { PublicProfileFragment } from './profile';

export const TokenTraitFragment = gql`
  fragment TokenTrait on TokenTrait {
    key
    value
    count
    percentage
    displayType
  }
`;

export const TransferRecordFragment = gql`
  fragment TransferRecord on TransferRecord {
    tokenId
    from
    to
    fromProfile {
      ...PublicProfile
    }
    toProfile {
      ...PublicProfile
    }
    timestamp
    txHash
    withPrice
    quantity
    paymentToken
  }
  ${PublicProfileFragment}
`;

export const Erc721TokenFragment = gql`
  fragment Erc721Token on Erc721 {
    tokenAddress
    tokenId
    name
    order {
      ...Order
    }
    image
    cdnImage
    video
    owner
    ownerProfile {
      ...PublicProfile
    }
    attributes
    traitDistribution {
      ...TokenTrait
    }
    isLocked
    collectionMetadata
  }
  ${OrderFragment}
  ${TokenTraitFragment}
`;

export const Erc1155TokenFragment = gql`
  fragment Erc1155Token on Erc1155 {
    totalListing
    totalItemsListing
    totalItems
    totalOwners
    tokenId
    tokenAddress
    name
    attributes
    image
    cdnImage
    video
    traitDistribution {
      ...TokenTrait
    }
    collectionMetadata
  }
  ${TokenTraitFragment}
`;
