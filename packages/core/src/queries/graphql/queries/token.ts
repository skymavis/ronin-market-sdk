import { gql } from 'graphql-request';

import { AssetFragment, AssetInfoFragment } from '../fragments/asset';
import { OrderFragment, OrderInfoFragment } from '../fragments/order';
import { PublicProfileBriefFragment } from '../fragments/profile';
import {
  Erc1155TokenBriefFragment,
  Erc1155TokenFragment,
  Erc721TokenFragment,
  TransferRecordFragment,
} from '../fragments/token';
import {
  TokenDataFragment,
  CreatorInformationFragment,
  GameInfoFragment,
  GameCampaignFragment,
  FeaturedGameEventFragment,
} from '../fragments/token';

// Erc721
export const GET_ERC721_TOKENS = gql`
  query GetERC721Tokens(
    $tokenAddress: String!
    $owner: String
    $auctionType: AuctionType
    $criteria: [SearchCriteria!]
    $from: Int!
    $size: Int!
    $sort: SortBy
    $name: String
    $priceRange: InputRange
    $rangeCriteria: [RangeSearchCriteria!]
    $showMinPrice: Boolean!
  ) {
    erc721Tokens(
      tokenAddress: $tokenAddress
      owner: $owner
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      size: $size
      sort: $sort
      name: $name
      priceRange: $priceRange
      rangeCriteria: $rangeCriteria
    ) {
      total
      results {
        ...Erc721Token
        minPrice @include(if: $showMinPrice)
      }
    }
  }
  ${Erc721TokenFragment}
`;

export const GET_ERC721_TOKEN = gql`
  query GetERC721Token($tokenAddress: String!, $tokenId: String!, $showMinPrice: Boolean!) {
    erc721Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      ...Erc721Token
      minPrice @include(if: $showMinPrice)
    }
  }
  ${Erc721TokenFragment}
`;

export const GET_ERC721_TRANSFER_HISTORY = gql`
  query GetERC721TransferHistory($tokenAddress: String!, $tokenId: String!, $from: Int!, $size: Int!) {
    erc721Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      transferHistory(from: $from, size: $size) {
        total
        results {
          ...TransferRecord
        }
      }
    }
  }
  ${TransferRecordFragment}
`;

// Erc1155
export const GET_ERC1155_TOKENS = gql`
  query GetERC1155Tokens(
    $tokenAddress: String!
    $criteria: [SearchCriteria!]
    $from: Int!
    $size: Int!
    $sort: SortBy
    $auctionType: AuctionType
    $name: String
    $showMinPrice: Boolean!
  ) {
    erc1155Tokens(
      tokenAddress: $tokenAddress
      criteria: $criteria
      from: $from
      size: $size
      sort: $sort
      auctionType: $auctionType
      name: $name
    ) {
      total
      results {
        ...Erc1155Token
        orders(from: 0, size: 1, showInvalid: false, sort: PriceAsc) {
          ...Order
        }
        minPrice @include(if: $showMinPrice)
      }
    }
  }
  ${OrderFragment}
  ${Erc1155TokenFragment}
`;

export const GET_ERC1155_TOKEN = gql`
  query GetERC1155Token($tokenAddress: String!, $tokenId: BigDecimal!, $showMinPrice: Boolean!) {
    erc1155Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      ...Erc1155Token
      minPrice @include(if: $showMinPrice)
    }
  }
  ${Erc1155TokenFragment}
`;

export const GET_ERC1155_TRANSFER_HISTORY = gql`
  query GetERC1155TransferHistory($tokenAddress: String!, $tokenId: BigDecimal!, $from: Int!, $size: Int!) {
    erc1155Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      transferHistory(from: $from, size: $size) {
        total
        results {
          ...TransferRecord
        }
      }
    }
  }
  ${TransferRecordFragment}
`;

export const GET_ERC1155_BALANCE = gql`
  query GetErc1155Balance($tokenAddress: String!, $tokenId: BigDecimal!, $owner: String!) {
    erc1155Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      balance(owner: $owner)
    }
  }
`;

// Get all tokens
export const GET_ALL_TOKENS = gql`
  query GetAllTokens(
    $owner: String!
    $auctionType: OrderAuctionType
    $from: Int!
    $size: Int!
    $sort: ListingSortBy!
    $tokenAddresses: [String!]!
  ) {
    tokens(
      owner: $owner
      auctionType: $auctionType
      from: $from
      size: $size
      sort: $sort
      tokenAddresses: $tokenAddresses
    ) {
      total
      data {
        ... on Erc721 {
          erc721TokenId: tokenId
          erc721TokenAddress: tokenAddress
          erc721Name: name
          erc721Image: image
          erc721CdnImage: cdnImage
          erc721Video: video
          erc721CollectionMetadata: collectionMetadata
          erc721Order: order {
            ...Order
          }
          erc721IsLocked: isLocked
        }
        ... on Erc1155 {
          erc1155TokenId: tokenId
          erc1155TokenAddress: tokenAddress
          erc1155Name: name
          erc1155Image: image
          erc1155CdnImage: cdnImage
          erc1155Video: video
          erc1155CollectionMetadata: collectionMetadata
          erc1155Orders: orders(maker: $owner, from: 0, size: 1, showInvalid: true, sort: PriceAsc) {
            ...Order
          }
          erc1155Balance: balance(owner: $owner)
        }
      }
    }
  }
  ${OrderFragment}
`;

export const GET_MY_ERC1155_TOKENS_LIST = gql`
  query GetMyERC1155TokensList(
    $tokenAddress: String
    $slug: String
    $owner: String!
    $criteria: [SearchCriteria!]
    $from: Int!
    $size: Int!
    $sort: SortBy
    $auctionType: AuctionType
    $name: String
  ) {
    erc1155Tokens(
      tokenAddress: $tokenAddress
      slug: $slug
      criteria: $criteria
      from: $from
      size: $size
      sort: $sort
      owner: $owner
      auctionType: $auctionType
      name: $name
    ) {
      total
      results {
        tokenAddress
        tokenId
        name
        image
        cdnImage
        video
        balance(owner: $owner)
        orders(maker: $owner, from: 0, size: 1, showInvalid: true, sort: PriceAsc) {
          ...OrderInfo
          __typename
        }
        otherOrders: orders(from: 0, size: 1, showInvalid: true, sort: PriceAsc) {
          ...OrderInfo
          __typename
        }
        isLocked
        collectionMetadata
        __typename
      }
      __typename
    }
  }
  ${OrderInfoFragment}
  ${AssetFragment}
  ${PublicProfileBriefFragment}
`;

export const GET_TOKEN_DATA = gql`
  query GetTokenData($tokenAddress: String, $slug: String) {
    tokenData(tokenAddress: $tokenAddress, slug: $slug) {
      ...TokenData
    }
  }
  ${TokenDataFragment}
  ${CreatorInformationFragment}
  ${GameInfoFragment}
  ${GameCampaignFragment}
  ${FeaturedGameEventFragment}
`;

export const GET_ERC1155_TOKEN_WITH_ORDERS = gql`
  query GetERC1155Token($tokenAddress: String!, $tokenId: BigDecimal!) {
    erc1155Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      tokenAddress
      tokenId
      slug
      name
      image
      cdnImage
      video
      minPrice
      totalItems
      collectionMetadata
      isLocked
      badged
      orders(from: 0, size: 1, showInvalid: false, sort: PriceAsc) {
        id
        maker
        kind
        assets {
          erc
          address
          id
          quantity
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
          accountId
          addresses {
            ethereum
            ronin
          }
          activated
          name
        }
        orderStatus
        orderQuantity {
          orderId
          quantity
          remainingQuantity
          availableQuantity
        }
      }
    }
  }
`;

export const GET_ERC1155_TOKENS_LIST = gql`
  query GetERC1155TokensList(
    $tokenAddress: String
    $slug: String
    $criteria: [SearchCriteria!]
    $from: Int!
    $size: Int!
    $sort: SortBy
    $auctionType: AuctionType
    $name: String
    $rangeCriteria: [RangeSearchCriteria!]
    $owner: String
  ) {
    erc1155Tokens(
      tokenAddress: $tokenAddress
      slug: $slug
      criteria: $criteria
      from: $from
      size: $size
      sort: $sort
      auctionType: $auctionType
      name: $name
      rangeCriteria: $rangeCriteria
      owner: $owner
    ) {
      total
      results {
        ...Erc1155TokenBrief
        __typename
      }
      __typename
    }
  }

  ${Erc1155TokenBriefFragment}
  ${OrderInfoFragment}
  ${AssetInfoFragment}
  ${PublicProfileBriefFragment}
`;
