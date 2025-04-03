import { ChainId } from '../../types';
import { CollectionAnalytic, CollectionData, TokenMetadata } from './types';

// Get collections
export interface GetCollectionsParams {
  chainId: ChainId;
  from: number;
  size: number;
  showMinPrice?: boolean;
}

export interface GetCollectionsResponse {
  erc721List: CollectionData[];
  erc1155List: CollectionData[];
}

export interface GetCollectionsResult {
  erc721Collections: CollectionData[];
  erc1155Collections: CollectionData[];
}

// Get collection data
export interface GetCollectionParams {
  chainId: ChainId;
  tokenAddress: string;
  showMinPrice?: boolean;
}

export interface GetCollectionResponse {
  tokenData: CollectionData;
}

// Get token metadata
export interface GetTokenMetadataParams {
  chainId: ChainId;
  tokenAddress: string;
  showAttributes?: boolean;
}

export interface GetTokenMetadataResponse {
  tokenMetadata: TokenMetadata;
}

export interface GetCollectionAnalyticsParams {
  chainId: ChainId;
  tokenAddress: string;
}

export interface GetCollectionAnalyticsResponse {
  collectionAnalytics: CollectionAnalytic;
}
