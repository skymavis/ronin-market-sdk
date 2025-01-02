import { ChainId } from '../../types';
import { CollectionMetadata, Erc } from '../collection';
import { AuctionType, ListingSortBy, Order } from '../order/types';
import {
  CommonTokenData,
  Erc721Token,
  Erc1155Token,
  InputRange,
  RangeSearchCriteria,
  SearchCriteria,
  SortBy,
  TransferHistory,
} from './types';

// Get tokens
export interface GetErc721TokensParams {
  chainId: ChainId;
  tokenAddress: string;
  from: number;
  size: number;
  owner?: string | null;
  auctionType?: AuctionType | null;
  criteria?: SearchCriteria[] | null;
  sort?: SortBy | null;
  name?: string | null;
  priceRange?: InputRange | null;
  rangeCriteria?: RangeSearchCriteria[] | null;
  showMinPrice?: boolean;
}

export interface GetErc721TokensResponse {
  erc721Tokens: {
    total: number;
    results: Erc721Token[];
  };
}

export interface GetErc721TokensResult {
  total: number;
  results: Erc721Token[];
}

export interface GetErc1155TokensParams {
  chainId: ChainId;
  tokenAddress: string;
  from: number;
  size: number;
  owner?: string | null;
  auctionType?: AuctionType | null;
  criteria?: SearchCriteria[] | null;
  sort?: SortBy | null;
  name?: string | null;
  showMinPrice?: boolean;
}

export interface GetErc1155TokensResponse {
  erc1155Tokens: {
    total: number;
    results: Erc1155Token[];
  };
}

export interface GetErc1155TokensResult {
  total: number;
  results: Erc1155Token[];
}

// Get token data
export interface GetErc721TokenParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  showMinPrice?: boolean;
}

export interface GetErc721TokenResponse {
  erc721Token: Erc721Token;
}

export interface GetErc1155TokenParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  showMinPrice?: boolean;
}

export interface GetErc1155TokenResponse {
  erc1155Token: Erc1155Token;
}

// Get token transfer history
export interface GetErc721TokenTransferHistoryParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  from: number;
  size: number;
}

export interface GetErc721TokenTransferHistoryResponse {
  erc721Token: {
    transferHistory: {
      total: number;
      results: TransferHistory[];
    };
  };
}

export interface GetErc721TokenTransferHistoryResult {
  total: number;
  results: TransferHistory[];
}

export interface GetErc1155TokenTransferHistoryParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  from: number;
  size: number;
}

export interface GetErc1155TokenTransferHistoryResponse {
  erc1155Token: {
    transferHistory: {
      total: number;
      results: TransferHistory[];
    };
  };
}

export interface GetErc1155TokenTransferHistoryResult {
  total: number;
  results: TransferHistory[];
}

// Get Erc1155 Balance
export interface GetErc1155BalanceParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
  owner: string;
}

export interface GetErc1155BalanceResponse {
  erc1155Token: {
    balance: string | null;
  };
}

// Refresh metadata
export interface RefreshMetadataParams {
  chainId: ChainId;
  tokenAddress: string;
  tokenId: string;
}

export interface RefreshMetadataResponse {
  refreshMetadata: boolean;
}

// Get all tokens
export interface GetAllTokensParams {
  chainId: ChainId;
  owner: string;
  from: number;
  size: number;
  auctionType?: AuctionType; // default: AuctionType.All
  sort?: ListingSortBy; // default: ListingSortBy.PriceAsc
}

export interface GetAllTokens_Erc721 {
  erc721TokenId: string;
  erc721TokenAddress: string;
  erc721Name: string | null;
  erc721Image: string | null;
  erc721CdnImage: string | null;
  erc721Video: string | null;
  erc721CollectionMetadata: CollectionMetadata | null;
  erc721Order: Order | null;
  erc721IsLocked: boolean;
}

export interface GetAllTokens_Erc1155 {
  erc1155TokenId: string;
  erc1155TokenAddress: string;
  erc1155Name: string | null;
  erc1155Image: string | null;
  erc1155CdnImage: string | null;
  erc1155Video: string | null;
  erc1155CollectionMetadata: CollectionMetadata | null;
  erc1155Orders: Order[];
  erc1155Balance: string | null;
}

export interface GetAllTokensResponse {
  tokens: {
    total: number;
    data: GetAllTokens_Erc721[] | GetAllTokens_Erc1155[];
  };
}

export interface GetAllTokensResult {
  total: number;
  tokens: {
    ercType: Erc;
    data: CommonTokenData;
  }[];
}
