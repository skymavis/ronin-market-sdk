import { BigNumber } from 'ethers';

import {
  checkIsInsufficientBalance,
  checkIsInsufficientOfferBalance,
  fetchOfferBalance,
  fetchPaymentTokenBalance,
  paymentTokens,
  Token,
} from '../../../src';
import { account, chainId } from '../../data-mock';

jest.mock('../../../src/services/balance/fetchBalances', () => {
  const mockFetchPaymentTokenBalance = jest.fn().mockImplementation(() => {
    return BigNumber.from(3);
  });

  const mockFetchOfferBalance = jest.fn().mockImplementation(() => {
    return BigNumber.from(2);
  });

  return {
    fetchPaymentTokenBalance: mockFetchPaymentTokenBalance,
    fetchOfferBalance: mockFetchOfferBalance,
  };
});

describe('test check is insufficiency balance', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('check is insufficient balance', async () => {
    const ronAddress = paymentTokens[chainId][Token.RON].address;

    const response = await checkIsInsufficientBalance(chainId, ronAddress, account, '1');
    expect(fetchPaymentTokenBalance).toHaveBeenCalled();
    expect(response).toBe(false);
  });

  test('check is insufficient offer balance', async () => {
    const response = await checkIsInsufficientOfferBalance(chainId, account, '1');
    expect(fetchOfferBalance).toHaveBeenCalled();
    expect(response).toBe(false);
  });
});
