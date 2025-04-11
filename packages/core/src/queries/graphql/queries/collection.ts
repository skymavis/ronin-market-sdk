import { gql } from 'graphql-request';

import { CollectionFragment, TokenMetaDataFragment } from '../fragments/collection';
import { PublicProfileBriefFragment } from '../fragments/profile';

export const GET_COLLECTIONS = gql`
  query Get721Collections($from: Int!, $size: Int!, $showMinPrice: Boolean!) {
    erc721List(from: $from, size: $size) {
      ...CollectionData
      minPrice @include(if: $showMinPrice)
    }
    erc1155List(from: $from, size: $size) {
      ...CollectionData
      minPrice @include(if: $showMinPrice)
    }
  }
  ${CollectionFragment}
`;

export const GET_COLLECTION = gql`
  query GetCollection($tokenAddress: String!, $showMinPrice: Boolean!) {
    tokenData(tokenAddress: $tokenAddress) {
      ...CollectionData
      minPrice @include(if: $showMinPrice)
    }
  }

  ${CollectionFragment}
`;

export const GET_TOKEN_METADATA = gql`
  query GetTokenMetadata($tokenAddress: String!, $showAttributes: Boolean!) {
    tokenMetadata(tokenAddress: $tokenAddress) {
      ...TokenMetadata
      attributes @include(if: $showAttributes) {
        displayType
        key
        values {
          value
          count
        }
      }
    }
  }
  ${TokenMetaDataFragment}
`;

export const GET_COLLECTION_ANALYTICS = gql`
  query GetCollectionAnalytics($tokenAddress: String!) {
    collectionAnalytics(tokenAddress: $tokenAddress) {
      ...CollectionAnalytic
      __typename
    }
  }

  fragment CollectionAnalytic on CollectionAnalytic {
    changesPct
    extraStats
    floorDepth
    mkpValueCharts
    tokenAddress
    totalSupply
    topOwners {
      ...TopOwner
    }
  }

  fragment TopOwner on TopOwner {
    owner
    ownerProfile {
      ...PublicProfileBrief
    }
    quantity
  }

  ${PublicProfileBriefFragment}
`;
