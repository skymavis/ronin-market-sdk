import { gql } from 'graphql-request';

export const CollectionFragment = gql`
  fragment CollectionData on TokenData {
    tokenAddress
    collectionMetadata
    totalVolume
    totalOwners
    totalItems
    totalListing
    erc
    allowedPaymentTokens
    volumeAllTime
  }
`;

export const TokenMetaDataFragment = gql`
  fragment TokenMetadata on TokenMetadata {
    erc
    attributes {
      displayType
      key
      values {
        value
        count
      }
    }
  }
`;
