import { Erc } from '../collection';
import { graphQLRequest } from '../graphql';
import { REFRESH_METADATA } from '../graphql/mutations/metadata';
import {
  GET_ALL_TOKENS,
  GET_ERC721_TOKEN,
  GET_ERC721_TOKENS,
  GET_ERC721_TRANSFER_HISTORY,
  GET_ERC1155_BALANCE,
  GET_ERC1155_TOKEN,
  GET_ERC1155_TOKENS,
  GET_ERC1155_TRANSFER_HISTORY,
} from '../graphql/queries/token';
import { AuctionType, ListingSortBy } from '../order/types';
import {
  GetAllTokens_Erc721,
  GetAllTokens_Erc1155,
  GetAllTokensParams,
  GetAllTokensResponse,
  GetErc721TokenParams,
  GetErc721TokenResponse,
  GetErc721TokensParams,
  GetErc721TokensResponse,
  GetErc721TokenTransferHistoryParams,
  GetErc721TokenTransferHistoryResponse,
  GetErc1155BalanceParams,
  GetErc1155BalanceResponse,
  GetErc1155TokenParams,
  GetErc1155TokenResponse,
  GetErc1155TokensParams,
  GetErc1155TokensResponse,
  GetErc1155TokenTransferHistoryParams,
  GetErc1155TokenTransferHistoryResponse,
  RefreshMetadataParams,
  RefreshMetadataResponse,
} from './queryTypes';
import { CommonTokenData } from './types';

export * from './queryTypes';
export * from './types';

// Erc721
export const getErc721Tokens = (params: GetErc721TokensParams) => {
  const { chainId, ...otherParams } = params;

  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetErc721TokensResponse>({ query: GET_ERC721_TOKENS, variables, chainId }).then(response => {
    const erc721Tokens = response?.erc721Tokens || {};
    const { total, results } = erc721Tokens;
    return {
      total: total || 0,
      results: results || [],
    };
  });
};

export const getErc721Token = (params: GetErc721TokenParams) => {
  const { chainId, ...otherParams } = params;

  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetErc721TokenResponse>({ query: GET_ERC721_TOKEN, variables, chainId }).then(
    response => response?.erc721Token,
  );
};

export const getErc721TokenTransferHistory = (params: GetErc721TokenTransferHistoryParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetErc721TokenTransferHistoryResponse>({
    query: GET_ERC721_TRANSFER_HISTORY,
    variables: { ...otherParams },
    chainId,
  }).then(response => {
    const transferHistory = response?.erc721Token?.transferHistory || {};
    const { total, results } = transferHistory;
    return {
      total: total || 0,
      results: results || [],
    };
  });
};

// Erc1155
export const getErc1155Tokens = (params: GetErc1155TokensParams) => {
  const { chainId, ...otherParams } = params;

  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetErc1155TokensResponse>({ query: GET_ERC1155_TOKENS, variables, chainId }).then(response => {
    const erc1155Tokens = response?.erc1155Tokens || {};
    const { total, results } = erc1155Tokens;
    return {
      total: total || 0,
      results: results || [],
    };
  });
};

export const getErc1155Token = (params: GetErc1155TokenParams) => {
  const { chainId, ...otherParams } = params;

  const variables = { showMinPrice: false, ...otherParams };
  return graphQLRequest<GetErc1155TokenResponse>({ query: GET_ERC1155_TOKEN, variables, chainId }).then(
    response => response?.erc1155Token,
  );
};

export const getErc1155TokenTransferHistory = (params: GetErc1155TokenTransferHistoryParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetErc1155TokenTransferHistoryResponse>({
    query: GET_ERC1155_TRANSFER_HISTORY,
    variables: { ...otherParams },
    chainId,
  }).then(response => {
    const transferHistory = response?.erc1155Token?.transferHistory || {};
    const { total, results } = transferHistory;
    return {
      total: total || 0,
      results: results || [],
    };
  });
};

export const getErc1155Balance = (params: GetErc1155BalanceParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<GetErc1155BalanceResponse>({
    query: GET_ERC1155_BALANCE,
    variables: { ...otherParams },
    chainId,
  }).then(response => response?.erc1155Token?.balance);
};

export const getAllTokens = (params: GetAllTokensParams) => {
  const { chainId, ...otherParams } = params;

  const variables = {
    auctionType: AuctionType.All,
    sort: ListingSortBy.PriceAsc,
    ...otherParams,
  };
  return graphQLRequest<GetAllTokensResponse>({
    query: GET_ALL_TOKENS,
    variables,
    chainId,
  }).then(response => {
    const results = response?.tokens || {};
    const { total, data } = results;

    const tokens = (data || []).map((tokenInfo: GetAllTokens_Erc721 | GetAllTokens_Erc1155) => {
      const {
        erc721TokenAddress,
        erc721TokenId,
        erc721CollectionMetadata,
        erc721Image,
        erc721CdnImage,
        erc721Video,
        erc721Name,
        erc721Order,
        erc721IsLocked,
      } = tokenInfo as GetAllTokens_Erc721;
      const {
        erc1155TokenAddress,
        erc1155TokenId,
        erc1155CollectionMetadata,
        erc1155Image,
        erc1155CdnImage,
        erc1155Video,
        erc1155Name,
        erc1155Orders,
        erc1155Balance,
      } = tokenInfo as GetAllTokens_Erc1155;

      const isErc721 = !!erc721TokenId;
      return {
        ercType: isErc721 ? Erc.Erc721 : Erc.Erc1155,
        data: {
          tokenAddress: erc721TokenAddress || erc1155TokenAddress,
          tokenId: erc721TokenId || erc1155TokenId,
          owner: params.owner,
          name: erc721Name || erc1155Name,
          image: erc721Image || erc1155Image,
          cdnImage: erc721CdnImage || erc1155CdnImage,
          video: erc721Video || erc1155Video,
          isLocked: isErc721 ? erc721IsLocked : false,
          collectionMetadata: erc721CollectionMetadata || erc1155CollectionMetadata,
          balance: isErc721 ? null : erc1155Balance,
          orders: isErc721 ? erc721Order : erc1155Orders,
        } as CommonTokenData,
      };
    });

    return {
      total: total || 0,
      tokens,
    };
  });
};

export const refreshMetadata = (params: RefreshMetadataParams) => {
  const { chainId, ...otherParams } = params;

  return graphQLRequest<RefreshMetadataResponse>({
    query: REFRESH_METADATA,
    variables: { ...otherParams },
    chainId,
  });
};
