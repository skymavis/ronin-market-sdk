import { graphQLRequest } from '../graphql';
import { GET_COLLECTION, GET_COLLECTION_ANALYTICS, GET_COLLECTIONS, GET_TOKEN_METADATA } from '../graphql/queries/collection';
import {
  GetCollectionAnalyticsParams,
  GetCollectionAnalyticsResponse,
  GetCollectionParams,
  GetCollectionResponse,
  GetCollectionsParams,
  GetCollectionsResponse,
  GetTokenMetadataParams,
  GetTokenMetadataResponse,
} from './queryTypes';

export * from './queryTypes';
export * from './types';

export const getCollections = (params: GetCollectionsParams) => {
  const { chainId, ...otherParams } = params;
  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetCollectionsResponse>({ query: GET_COLLECTIONS, variables, chainId }).then(response => ({
    erc721Collections: response?.erc721List || [],
    erc1155Collections: response?.erc1155List || [],
  }));
};

export const getCollection = (params: GetCollectionParams) => {
  const { chainId, ...otherParams } = params;
  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetCollectionResponse>({ query: GET_COLLECTION, variables, chainId }).then(
    response => response?.tokenData,
  );
};

export const getTokenMetadata = (params: GetTokenMetadataParams) => {
  const { chainId, ...otherParams } = params;
  return graphQLRequest<GetTokenMetadataResponse>({
    query: GET_TOKEN_METADATA,
    variables: { showAttributes: true, ...otherParams },
    chainId,
  }).then(response => response?.tokenMetadata);
};

export const getCollectionAnalytics = (params: GetCollectionAnalyticsParams) => {
  const { chainId, ...otherParams } = params;
  return graphQLRequest<GetCollectionAnalyticsResponse>({
    query: GET_COLLECTION_ANALYTICS,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.collectionAnalytics);
};
