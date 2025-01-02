import { ChainId } from '../../types';
import { Erc1155SortBy } from '../token';
import { CollectibleFilter, InputOrder, ListingSortBy, Order } from './types';

export interface Erc721TokenDataParam {
  tokenAddress: string;
  tokenId: string;
}

export interface GetActiveOrdersOfTokensParams {
  chainId: ChainId;
  tokenIds: Erc721TokenDataParam[];
}

export interface GetActiveOrdersOfTokensResponse {
  activeOrdersOfTokens: Order[];
}

// Get Erc1155 orders
export interface GetErc721OrderParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
}

export interface GetErc721OrderResponse {
  erc721Token: {
    order: Order;
  };
}

// Get Erc1155 orders
export interface GetErc1155OrdersParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  from: number;
  size: number;
  maker?: string | null;
  showInvalid?: boolean; // default: true
  sort?: Erc1155SortBy; // default: Erc1155SortBy.PriceAsc
}

export interface GetErc1155OrdersResponse {
  erc1155Token: {
    orders: Order[];
  };
}

export interface GetOrderByHashParams {
  chainId: ChainId;
  hash: string;
}

export interface GetOrderResponse {
  order: Order;
}

// Get my orders
export interface GetOrdersByAddressParams {
  chainId: ChainId;
  account: string;
  from: number;
  size: number;
  sort?: ListingSortBy; // default: ListingSortBy.PriceAsc
  isValid?: boolean;
  collectibleFilters?: CollectibleFilter; // default: { tokenAddresses: [] }
}

export interface GetOrdersByAddressResponse {
  myListingOrders: {
    total: number;
    quantity: number;
    data: Order[];
  };
}

export interface GetOrderResult {
  total: number;
  quantity: number;
  data: Order[];
}

// Create order
export interface RequestCreateOrderParams {
  chainId: ChainId;
  order: InputOrder;
  signature: string;
  account: string;
}

export interface CreateOrderResponse {
  createOrder: Order;
}
