import { request, Variables } from 'graphql-request';

import { ChainId } from '../../types';

export const testnetGraphQLEndpoint = 'https://dev-marketplace-graphql.skymavis.one/graphql';
export const mainnetGraphQLEndpoint = 'https://marketplace-graphql.skymavis.com/graphql';
interface GraphQLRequestParams {
  chainId: ChainId;
  query: string;
  variables?: Variables;
  headers?: string[][] | Record<string, string>;
}

export const graphQLRequest = async <T>(params: GraphQLRequestParams) => {
  const { query, variables, headers, chainId } = params;
  const graphQLEndpoint = chainId === ChainId.mainnet ? mainnetGraphQLEndpoint : testnetGraphQLEndpoint;
  return request<T>(graphQLEndpoint, query, variables, headers);
};
