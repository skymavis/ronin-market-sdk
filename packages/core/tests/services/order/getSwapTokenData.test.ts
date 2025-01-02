import * as ethersUtils from 'ethers/lib/utils';

import {
  createKatanaContract,
  createReadOnlyProvider,
  getLiquidityProviderFee,
  getLiquidityProviderFeePercent,
  getPriceImpactPercent,
  getSwapConfig,
  getSwappedAmount,
  paymentTokens,
} from '../../../src';
import { Token } from '../../../src/services/tokens/data';
import { chainId } from '../../data-mock';

const inputTokenAddress = paymentTokens[chainId][Token.RON].address;
const outTokenAddress = paymentTokens[chainId][Token.WETH].address;

jest.mock('../../../src/services/tokens/configs', () => {
  return {
    getSwapConfig: jest.fn().mockImplementation(() => ({
      '0xa959726154953bae111746e265e6d754f48570e6': { lpFeePercent: 30 },
    })),
  };
});

jest.mock('../../../src/contracts', () => {
  const mockCreateProvider = jest.fn().mockImplementation(() => {
    return {
      call: jest.fn(),
    };
  });

  const mockCreateKatanaContract = jest.fn().mockImplementation(() => {
    return {
      encodeOrder: jest.fn(),
      connect: jest.fn().mockImplementation(() => {
        return {
          getAmountsIn: jest.fn().mockImplementation(() => [1]),
        };
      }),
    };
  });

  return {
    createKatanaContract: mockCreateKatanaContract,
    createReadOnlyProvider: mockCreateProvider,
  };
});

describe('get swap token data', () => {
  test('get liquidity provider fee percent', () => {
    const feePercent = getLiquidityProviderFeePercent(chainId, inputTokenAddress, outTokenAddress);

    expect(getSwapConfig).toHaveBeenCalled();
    expect(feePercent).toBe(30);
  });

  test('get price impact percent', async () => {
    const priceImpactPercent = await getPriceImpactPercent(chainId, inputTokenAddress, outTokenAddress, 2, 8);

    expect(getSwapConfig).toHaveBeenCalled();
    expect(priceImpactPercent).toBe(45);
  });

  test('get liquidity provider fee', async () => {
    const formatUnitsSpyOn = jest.spyOn(ethersUtils, 'formatUnits');

    const fee = await getLiquidityProviderFee(chainId, inputTokenAddress, outTokenAddress, '1000000000000000000');

    expect(formatUnitsSpyOn).toHaveBeenCalled();
    expect(fee.value).toBeInstanceOf<'number'>;
    expect(fee.symbol).toBeInstanceOf<'string'>;
  });

  test('get swapped amount', async () => {
    const swappedAmount = await getSwappedAmount(chainId, inputTokenAddress, outTokenAddress, '1000000000000000000');

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createKatanaContract).toHaveBeenCalled();
    expect(getSwapConfig).toHaveBeenCalled();
    expect(swappedAmount).toBe(1);
  });
});
