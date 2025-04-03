import * as graphqlRequest from 'graphql-request';

import {
  getAllTokens,
  GetAllTokensParams,
  getErc721Token,
  GetErc721TokenParams,
  getErc721Tokens,
  GetErc721TokensParams,
  getErc721TokenTransferHistory,
  GetErc721TokenTransferHistoryParams,
  getErc1155Balance,
  GetErc1155BalanceParams,
  getErc1155Token,
  GetErc1155TokenParams,
  getErc1155Tokens,
  GetErc1155TokensParams,
  getErc1155TokenTransferHistory,
  GetErc1155TokenTransferHistoryParams,
  getMyErc1155TokensList,
  GetMyErc1155TokensListParams,
  AuctionType,
  SortBy,
} from '../../src';
import { account, chainId, erc721TokenAddress, erc721TokenId, erc1155TokenAddress, erc1155TokenId } from '../data-mock';

describe('test token queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('get erc721 tokens', async () => {
    const pageSize = 5;

    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      from: 0,
      size: pageSize,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc721Tokens(params);
    const { total, results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(Array.isArray(results)).toBe(true);
    expect(results?.length).toBeLessThanOrEqual(pageSize);
    expect(results?.length).toBeLessThanOrEqual(total);
    expect(results?.[0]?.minPrice).toBe(undefined);
    expect(!results?.[0] || results?.[0]?.tokenAddress === erc721TokenAddress).toBe(true);
  });

  test('get erc721 tokens with min price', async () => {
    const pageSize = 5;

    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      from: 0,
      size: pageSize,
      showMinPrice: true,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc721Tokens(params);
    const { results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(!results?.[0] || results?.[0]?.minPrice !== undefined).toBe(true);
  });

  test('get erc721 tokens with incorrect params', () => {
    const params = {};

    expect(getErc721Tokens(params as GetErc721TokensParams)).rejects.toThrow();
  });

  test('get erc721 token detail', async () => {
    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      tokenId: erc721TokenId,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc721Token(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.tokenId).toBe(erc721TokenId);
    expect(response.tokenAddress).toBe(erc721TokenAddress);
    expect(response.minPrice).toBe(undefined);
  });

  test('get erc721 token detail with min price', async () => {
    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      tokenId: erc721TokenId,
      showMinPrice: true,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc721Token(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.minPrice).not.toBe(undefined);
  });

  test('get erc721 token detail with incorrect params', () => {
    const params = {};

    expect(getErc721Token(params as GetErc721TokenParams)).rejects.toThrow();
  });

  test('get erc721 token transfer history', async () => {
    const pageSize = 5;
    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      tokenId: erc721TokenId,
      from: 0,
      size: pageSize,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc721TokenTransferHistory(params);
    const { total, results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(results?.length).toBeLessThanOrEqual(pageSize);
    expect(results?.length).toBeLessThanOrEqual(total);
  });

  test('get erc721 token transfer history with incorrect params', () => {
    const params = {};

    expect(getErc721TokenTransferHistory(params as GetErc721TokenTransferHistoryParams)).rejects.toThrow();
  });

  test('get erc1155 tokens', async () => {
    const pageSize = 5;

    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      from: 0,
      size: pageSize,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc1155Tokens(params);
    const { total, results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(Array.isArray(results)).toBe(true);
    expect(results?.length).toBeLessThanOrEqual(pageSize);
    expect(results?.length).toBeLessThanOrEqual(total);
    expect(results?.[0]?.minPrice).toBe(undefined);
    expect(!results?.[0] || results?.[0]?.tokenAddress === erc1155TokenAddress).toBe(true);
  });

  test('get erc1155 tokens with min price', async () => {
    const pageSize = 5;

    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      from: 0,
      size: pageSize,
      showMinPrice: true,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc1155Tokens(params);
    const { results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(!results?.[0] || results?.[0]?.minPrice !== undefined).toBe(true);
  });

  test('get erc1155 tokens with incorrect params', () => {
    const params = {};

    expect(getErc1155Tokens(params as GetErc1155TokensParams)).rejects.toThrow();
  });

  test('get erc1155 token detail', async () => {
    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      tokenId: erc1155TokenId,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');

    const response = await getErc1155Token(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.tokenId).toBe(erc1155TokenId);
    expect(response.tokenAddress).toBe(erc1155TokenAddress);
    expect(response.minPrice).toBe(undefined);
  });

  test('get erc1155 token detail with min price', async () => {
    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      tokenId: erc1155TokenId,
      showMinPrice: true,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');

    const response = await getErc1155Token(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.minPrice).not.toBe(undefined);
  });

  test('get erc1155 token detail with incorrect params', () => {
    const params = {};

    expect(getErc1155Token(params as GetErc1155TokenParams)).rejects.toThrow();
  });

  test('get erc1155 token transfer history', async () => {
    const pageSize = 5;
    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      tokenId: erc1155TokenId,
      from: 0,
      size: pageSize,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getErc1155TokenTransferHistory(params);
    const { total, results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(results?.length).toBeLessThanOrEqual(pageSize);
    expect(results?.length).toBeLessThanOrEqual(total);
  });

  test('get erc1155 token transfer history with incorrect params', () => {
    const params = {};

    expect(getErc1155TokenTransferHistory(params as GetErc1155TokenTransferHistoryParams)).rejects.toThrow();
  });

  test('get erc1155 balance', async () => {
    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      tokenId: erc1155TokenId,
      owner: account,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ erc1155Token: { balance: 2 } }));
    const response = await getErc1155Balance(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response).toBe(2);
  });

  test('get erc1155 balance with incorrect params', () => {
    const params = {};

    expect(getErc1155Balance(params as GetErc1155BalanceParams)).rejects.toThrow();
  });

  test('get all tokens', async () => {
    const pageSize = 5;
    const params = {
      chainId,
      owner: account,
      from: 0,
      size: pageSize,
    };

    const erc721Data = {
      erc721TokenAddress,
      erc721TokenId,
      erc721Name: '',
      erc721Image: '',
      erc721CdnImage: '',
      erc721Video: '',
      erc721CollectionMetadata: null,
      erc721Order: null,
      erc721IsLocked: false,
    };

    const erc1155Data = {
      erc1155TokenAddress,
      erc1155TokenId,
      erc1155Name: '',
      erc1155Image: '',
      erc1155CdnImage: '',
      erc1155Video: '',
      erc1155CollectionMetadata: null,
      erc1155Orders: [],
      erc1155Balance: null,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ tokens: { total: 2, data: [erc721Data, erc1155Data] } }));
    const response = await getAllTokens(params);
    const { total, tokens } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(total).toBe(2);
    expect(tokens.length).toBe(2);
  });

  test('get all tokens with incorrect params', () => {
    const params = {};

    expect(getAllTokens(params as GetAllTokensParams)).rejects.toThrow();
  });

  test('get my erc1155 tokens list', async () => {
    const pageSize = 5;
    const owner = account;

    const params: GetMyErc1155TokensListParams = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      owner,
      from: 0,
      size: pageSize,
      sort: SortBy.PriceAsc,
      auctionType: AuctionType.All,
    };

    const mockResponse = {
      erc1155Tokens: {
        total: 1,
        results: [{
          tokenAddress: erc1155TokenAddress,
          tokenId: erc1155TokenId,
          name: 'Test Token',
          image: 'test-image',
          cdnImage: 'test-cdn-image',
          video: 'test-video',
          balance: 1,
          orders: [{
            id: 'test-order-id',
            maker: owner,
            kind: 'test-kind',
            assets: [],
            expiredAt: 'test-expired-at',
            paymentToken: 'test-payment-token',
            startedAt: 'test-started-at',
            basePrice: 'test-base-price',
            expectedState: 'test-expected-state',
            nonce: 'test-nonce',
            marketFeePercentage: 0,
            signature: 'test-signature',
            hash: 'test-hash',
            duration: 'test-duration',
            timeLeft: 'test-time-left',
            currentPrice: 'test-current-price',
            suggestedPrice: 'test-suggested-price',
            makerProfile: {
              accountId: 'test-account-id',
              addresses: {
                ethereum: 'test-ethereum',
                ronin: 'test-ronin'
              },
              activated: true,
              name: 'test-name'
            },
            orderStatus: 'test-order-status',
            orderQuantity: {
              orderId: 'test-order-id',
              quantity: 1,
              remainingQuantity: 1,
              availableQuantity: 1
            }
          }],
          otherOrders: [],
          isLocked: false,
          collectionMetadata: {}
        }]
      }
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve(mockResponse));

    const response = await getMyErc1155TokensList(params);
    const { total, results } = response;

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(Array.isArray(results)).toBe(true);
    expect(results?.length).toBeLessThanOrEqual(pageSize);
    expect(results?.length).toBeLessThanOrEqual(total);
    expect(results?.[0]?.tokenAddress).toBe(erc1155TokenAddress);
    expect(results?.[0]?.balance).toBeDefined();
    expect(results?.[0]?.orders).toBeDefined();
    expect(results?.[0]?.otherOrders).toBeDefined();
    expect(results?.[0]?.isLocked).toBeDefined();
    expect(results?.[0]?.collectionMetadata).toBeDefined();
  });

  test('get my erc1155 tokens list with incorrect params', () => {
    const params = {};

    expect(getMyErc1155TokensList(params as GetMyErc1155TokensListParams)).rejects.toThrow();
  });
});
