import { graphQLRequest } from '../graphql';
import { CREATE_ORDER } from '../graphql/mutations/order';
import {
  GET_ACTIVE_ORDERS_OF_TOKENS,
  GET_ERC721_ORDER,
  GET_ERC1155_ORDERS,
  GET_ORDER_BY_HASH,
  GET_ORDERS_BY_ADDRESS,
} from '../graphql/queries/order';
import { Erc1155SortBy } from '../token/types';
import {
  CreateOrderResponse,
  GetActiveOrdersOfTokensParams,
  GetActiveOrdersOfTokensResponse,
  GetErc721OrderParams,
  GetErc721OrderResponse,
  GetErc1155OrdersParams,
  GetErc1155OrdersResponse,
  GetOrderByHashParams,
  GetOrderResponse,
  GetOrdersByAddressParams,
  GetOrdersByAddressResponse,
  RequestCreateOrderParams,
} from './queryTypes';
import { ListingSortBy } from './types';

export * from './queryTypes';
export * from './types';

export const getErc721Order = (params: GetErc721OrderParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetErc721OrderResponse>({
    query: GET_ERC721_ORDER,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.erc721Token?.order);
};

export const getErc1155Orders = (params: GetErc1155OrdersParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetErc1155OrdersResponse>({
    query: GET_ERC1155_ORDERS,
    variables: { showInvalid: true, sort: Erc1155SortBy.PriceAsc, ...otherParams },
    chainId,
  }).then(response => response?.erc1155Token?.orders);
};

export const getOrderByHash = (params: GetOrderByHashParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetOrderResponse>({
    query: GET_ORDER_BY_HASH,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.order);
};

export const getOrdersByAddress = (params: GetOrdersByAddressParams) => {
  const { chainId, account, accessToken, ...otherParams } = params;
  const variables = {
    sort: ListingSortBy.ExpiredAtAsc,
    collectibleFilters: {
      tokenAddresses: [],
    },
    roninAddress: account,
    ...otherParams,
  };
  return graphQLRequest<GetOrdersByAddressResponse>({
    query: GET_ORDERS_BY_ADDRESS,
    variables,
    chainId,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(response => response?.myListingOrders);
};

export const requestCreateOrder = async (params: RequestCreateOrderParams) => {
  const { chainId, account, ...otherParams } = params;
  return graphQLRequest<CreateOrderResponse>({
    query: CREATE_ORDER,
    variables: { maker: account, ...otherParams },
    chainId,
  }).then(response => response?.createOrder);
};

export const getActiveOrdersOfTokens = (params: GetActiveOrdersOfTokensParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetActiveOrdersOfTokensResponse>({
    query: GET_ACTIVE_ORDERS_OF_TOKENS,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.activeOrdersOfTokens);
};
