import { gql } from 'graphql-request';

import { OrderFragment } from '../fragments/order';

export const GET_ERC721_ORDER = gql`
  query GetErc721Order($tokenAddress: String!, $tokenId: String!) {
    erc721Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      order {
        ...Order
      }
    }
  }
  ${OrderFragment}
`;

export const GET_ERC1155_ORDERS = gql`
  query GetErc1155Orders(
    $tokenAddress: String!
    $tokenId: BigDecimal!
    $from: Int!
    $size: Int!
    $maker: String
    $showInvalid: Boolean!
    $sort: Erc1155SortBy!
  ) {
    erc1155Token(tokenAddress: $tokenAddress, tokenId: $tokenId) {
      orders(maker: $maker, from: $from, size: $size, showInvalid: $showInvalid, sort: $sort) {
        ...Order
      }
    }
  }
  ${OrderFragment}
`;

export const GET_ORDER_BY_HASH = gql`
  query GetOrderByHash($hash: String!) {
    order(hash: $hash) {
      ...Order
    }
  }
  ${OrderFragment}
`;

export const GET_ORDERS_BY_ADDRESS = gql`
  query GetOrdersByAddress(
    $from: Int!
    $size: Int!
    $sort: ListingSortBy!
    $isValid: Boolean
    $collectibleFilters: CollectibleFilter!
    $roninAddress: String!
  ) {
    myListingOrders(
      from: $from
      size: $size
      sort: $sort
      isValid: $isValid
      collectibleFilters: $collectibleFilters
      roninAddress: $roninAddress
    ) {
      total
      quantity
      data {
        ...Order
        assets {
          erc
          token {
            ... on Erc721 {
              erc721TokenId: tokenId
              erc721TokenAddress: tokenAddress
              erc721Name: name
              erc721Image: image
              erc721CdnImage: cdnImage
              erc721CollectionMetadata: collectionMetadata
            }
            ... on Erc1155 {
              erc1155TokenId: tokenId
              erc1155TokenAddress: tokenAddress
              erc1155Name: name
              erc1155Image: image
              erc1155CdnImage: cdnImage
              erc1155Balance: balance(owner: $roninAddress)
              erc1155CollectionMetadata: collectionMetadata
            }
          }
        }
      }
    }
  }

  ${OrderFragment}
`;

export const GET_ACTIVE_ORDERS_OF_TOKENS = gql`
  query GetActiveOrdersOfTokens($tokenIds: [TokenId!]!) {
    activeOrdersOfTokens(tokenIds: $tokenIds) {
      ...Order
    }
  }

  ${OrderFragment}
`;
