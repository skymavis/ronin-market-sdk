import * as graphqlRequest from 'graphql-request';

import {
  getErc721Order,
  GetErc721OrderParams,
  getErc1155Orders,
  GetErc1155OrdersParams,
  getOrderByHash,
  GetOrderByHashParams,
  getOrdersByAddress,
  GetOrdersByAddressParams,
  requestCreateOrder,
  RequestCreateOrderParams,
} from '../../src';
import {
  account,
  chainId,
  createOrderData,
  erc721Order,
  erc721OrderHash,
  erc721TokenAddress,
  erc721TokenId,
  erc1155Order,
  erc1155TokenAddress,
  erc1155TokenId,
} from '../data-mock';

describe('test order queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('get erc721 order', async () => {
    const params = {
      chainId,
      tokenAddress: erc721TokenAddress,
      tokenId: erc721TokenId,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ erc721Token: { order: erc721Order } }));

    const response = await getErc721Order(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response).not.toBeNull();
  });

  test('get erc721 order with incorrect params', async () => {
    const params = {};

    expect(getErc721Order(params as GetErc721OrderParams)).rejects.toThrow();
  });

  test('get erc1155 orders', async () => {
    const params = {
      chainId,
      tokenAddress: erc1155TokenAddress,
      tokenId: erc1155TokenId,
      from: 0,
      size: 5,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ erc1155Token: { orders: [erc1155Order] } }));

    const response = await getErc1155Orders(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(1);
  });

  test('get erc1155 orders with incorrect params', async () => {
    const params = {};

    expect(getErc1155Orders(params as GetErc1155OrdersParams)).rejects.toThrow();
  });

  test('get order detail', async () => {
    const params = {
      chainId,
      hash: erc721OrderHash,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ order: erc721Order }));

    const response = await getOrderByHash(params);
    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response).not.toBeNull();
  });

  test('get order detail with incorrect params', async () => {
    const params = {};

    expect(getOrderByHash(params as GetOrderByHashParams)).rejects.toThrow();
  });

  test('get orders by hash', async () => {
    const params = {
      accessToken: '',
      chainId,
      account,
      from: 0,
      size: 5,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request').mockReturnValue(
      Promise.resolve({
        myListingOrders: {
          data: [erc721Order],
          total: 1,
          quantity: 1,
        },
      }),
    );

    const response = await getOrdersByAddress(params);
    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.total).toBe(1);
    expect(response.quantity).toBe(1);
    expect(response.data.length).toBe(1);
  });

  test('get orders by hash with incorrect params', () => {
    const params = {};

    expect(getOrdersByAddress(params as GetOrdersByAddressParams)).rejects.toThrow();
  });

  test('request create order', async () => {
    const { order, signature } = createOrderData;
    const params = {
      chainId,
      order,
      signature,
      account,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ createOrder: erc721Order }));

    const response = await requestCreateOrder(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response).not.toBe(null);
  });

  test('get order detail with incorrect params', async () => {
    const params = {};

    expect(requestCreateOrder(params as RequestCreateOrderParams)).rejects.toThrow();
  });
});
