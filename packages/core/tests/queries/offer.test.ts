import * as graphqlRequest from 'graphql-request';

import {
  getOffer,
  GetOfferParams,
  getOffersAmount,
  GetOffersAmountParams,
  getReceivedOffers,
  GetReceivedOffersParams,
  getSentOffers,
  GetSentOffersParams,
} from '../../src';
import { chainId, erc721OrderHash, offerData } from '../data-mock';
import { account } from '../data-mock/profile';

describe('test offer queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('get offer', async () => {
    const params = {
      hash: erc721OrderHash,
      chainId,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ order: offerData }));
    const response = await getOffer(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response?.hash).toEqual(offerData.hash);
  });

  test('get offer with incorrect params', () => {
    const params = { chainId };

    expect(getOffer(params as GetOfferParams)).rejects.toThrow();
  });

  test('get sent offers', async () => {
    const params = {
      chainId,
      from: 0,
      size: 5,
      account,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ sentOffers: { data: [offerData], total: 1 } }));
    const response = await getSentOffers(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.total).toEqual(1);
    expect(response.data.length).toEqual(1);
  });

  test('get sent offers with incorrect params', () => {
    const params = { chainId };

    expect(getSentOffers(params as GetSentOffersParams)).rejects.toThrow();
  });

  test('get received offers', async () => {
    const params = {
      chainId,
      from: 0,
      size: 5,
      account,
    };

    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ receivedOffers: { data: [offerData], total: 1 } }));
    const response = await getReceivedOffers(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.total).toEqual(1);
    expect(response.data.length).toEqual(1);
  });

  test('get received offers with incorrect params', () => {
    const params = { chainId };

    expect(getReceivedOffers(params as GetReceivedOffersParams)).rejects.toThrow();
  });

  test('get offers amount', async () => {
    const params = {
      chainId,
      account,
    };
    const graphQLRequestSpyOn = jest
      .spyOn(graphqlRequest, 'request')
      .mockReturnValue(Promise.resolve({ receivedOffers: { total: 1 }, sentOffers: { total: 2 } }));
    const response = await getOffersAmount(params);

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(response.receivedOffersAmount).toEqual(1);
    expect(response.sentOffersAmount).toEqual(2);
  });

  test('get offers offers with incorrect params', () => {
    const params = {};

    expect(getOffersAmount(params as GetOffersAmountParams)).rejects.toThrow();
  });
});
