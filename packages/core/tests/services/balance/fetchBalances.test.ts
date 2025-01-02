import {
  createErc20Contract,
  createReadOnlyProvider,
  createWRonContract,
  fetchOfferBalance,
  fetchPaymentTokenBalance,
  paymentTokens,
  Token,
} from '../../../src';
import { account, chainId } from '../../data-mock';

jest.mock('../../../src/contracts', () => {
  const mockCreateContract = jest.fn().mockImplementation(() => {
    return {
      connect: jest.fn().mockImplementation(() => {
        return {
          balanceOf: jest.fn().mockImplementation(() => {
            return 1;
          }),
        };
      }),
    };
  });

  const mockCreateProvider = jest.fn().mockImplementation(() => {
    return {
      getBalance: jest.fn().mockImplementation(() => {
        return 2;
      }),
    };
  });

  return {
    createWRonContract: mockCreateContract,
    createErc20Contract: mockCreateContract,
    createReadOnlyProvider: mockCreateProvider,
  };
});

describe('test fetch balance', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('fetch wRon balance', async () => {
    const response = await fetchOfferBalance(chainId, account);

    expect(createWRonContract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();

    expect(response).toBe(1);
  });

  test('fetch wRon balance with invalid account', async () => {
    try {
      fetchOfferBalance(chainId, '0x');
    } catch (error) {
      expect(createWRonContract).not.toHaveBeenCalled();
      expect(createReadOnlyProvider).not.toHaveBeenCalled();
      expect(error).toEqual(new Error('Invalid account'));
    }
  });

  test('fetch ron balance', async () => {
    const ronAddress = paymentTokens[chainId][Token.RON].address;
    const response = await fetchPaymentTokenBalance(chainId, ronAddress, account);

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createErc20Contract).toHaveBeenCalled();

    expect(response).toBe(2);
  });

  test('fetch ron balance with invalid account', async () => {
    try {
      const ronAddress = paymentTokens[chainId][Token.RON].address;
      fetchPaymentTokenBalance(chainId, ronAddress, '0x');
    } catch (error) {
      expect(createReadOnlyProvider).not.toHaveBeenCalled();
      expect(createErc20Contract).not.toHaveBeenCalled();
      expect(error).toEqual(new Error('Invalid account'));
    }
  });

  test('fetch weth balance', async () => {
    const wethAddress = paymentTokens[chainId][Token.WETH].address;
    const response = await fetchPaymentTokenBalance(chainId, wethAddress, account);

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createErc20Contract).toHaveBeenCalled();

    expect(response).toBe(1);
  });

  test('fetch weth balance with invalid weth address', async () => {
    try {
      fetchPaymentTokenBalance(chainId, '0x', account);
    } catch (error) {
      expect(createReadOnlyProvider).not.toHaveBeenCalled();
      expect(createErc20Contract).not.toHaveBeenCalled();
      expect(error).toEqual(new Error('Invalid token address'));
    }
  });

  test('fetch weth balance with invalid account', async () => {
    try {
      const wethAddress = paymentTokens[chainId][Token.WETH].address;
      fetchPaymentTokenBalance(chainId, wethAddress, '0x');
    } catch (error) {
      expect(createReadOnlyProvider).not.toHaveBeenCalled();
      expect(createErc20Contract).not.toHaveBeenCalled();
      expect(error).toEqual(new Error('Invalid account'));
    }
  });
});
