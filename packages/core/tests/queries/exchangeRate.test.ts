import * as graphqlRequest from 'graphql-request';

import { getExchangeRate } from '../../src';
import { chainId } from '../data-mock';

describe('test exchange rate queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('get exchange rate', async () => {
    const params = {
      chainId,
    };

    const graphQLRequestSpyOn = jest.spyOn(graphqlRequest, 'request');

    const response = await getExchangeRate(params);
    const { eth, slp, ron, axs, usd } = response || {};

    expect(graphQLRequestSpyOn).toHaveBeenCalledTimes(1);
    expect(typeof eth.usd).toBe('number');
    expect(typeof slp.usd).toBe('number');
    expect(typeof ron.usd).toBe('number');
    expect(typeof axs.usd).toBe('number');
    expect(typeof usd.usd).toBe('number');
  });
});
