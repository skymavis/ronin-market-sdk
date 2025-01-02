import * as graphqlRequest from 'graphql-request';

import { getCollection, getCollections, GetCollectionsParams, getTokenMetadata } from '../../src';
import { chainId, erc721TokenAddress } from '../data-mock';

describe('test collection queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('get collections', async () => {
    const pageSize = 5;
    const params = {
      from: 0,
      size: pageSize,
      chainId,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');
    const response = await getCollections(params);
    const { erc1155Collections, erc721Collections } = response || {};

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(Array.isArray(erc1155Collections)).toBe(true);
    expect(Array.isArray(erc721Collections)).toBe(true);
    expect(erc1155Collections?.length).toBeLessThanOrEqual(pageSize);
    expect(erc721Collections?.length).toBeLessThanOrEqual(pageSize);
  });

  test('get collections with incorrect params', () => {
    const pageSize = 5;
    const params = {
      size: pageSize,
      chainId,
    };

    expect(getCollections(params as GetCollectionsParams)).rejects.toThrow();
  });

  test('get collection', async () => {
    const params = {
      tokenAddress: erc721TokenAddress,
      chainId,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');

    const response = await getCollection(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response?.tokenAddress).toEqual(erc721TokenAddress);
  });

  test('get collection with incorrect params', async () => {
    const params = {
      tokenAddress: '',
      chainId,
    };

    expect(getCollection(params)).rejects.toThrow();
  });

  test('get token metadata', async () => {
    const params = {
      tokenAddress: erc721TokenAddress,
      chainId,
    };
    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');

    const response = await getTokenMetadata(params);
    const { erc, attributes } = response || {};

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(erc).not.toBeNull();
    expect(Array.isArray(attributes)).toBe(true);
  });

  test('get token metadata with incorrect params', async () => {
    const params = {
      tokenAddress: '',
      chainId,
    };

    expect(getTokenMetadata(params)).rejects.toThrow();
  });
});
