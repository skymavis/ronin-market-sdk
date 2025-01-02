import { BigNumber } from 'ethers';

import { createMarketGatewayContract, createReadOnlyProvider, getNonce } from '../../../src';
import { account, chainId } from '../../data-mock';

jest.mock('../../../src/contracts', () => {
  const mockCreateProvider = jest.fn().mockImplementation(() => {
    return {
      call: jest.fn(),
    };
  });

  const mockMarketGatewayContract = jest.fn().mockImplementation(() => {
    return {
      encodeOrder: jest.fn(),
      interface: {
        encodeFunctionData: jest.fn(),
      },
    };
  });

  return {
    createMarketGatewayContract: mockMarketGatewayContract,
    createReadOnlyProvider: mockCreateProvider,
    MavisExchange__factory: {
      createInterface: jest.fn().mockImplementation(() => ({
        encodeFunctionData: jest.fn(),
        decodeFunctionResult: jest.fn().mockImplementation(() => [BigNumber.from(2)]),
      })),
    },
  };
});

describe('test get nonce', () => {
  test('get nonce', async () => {
    const nonce = await getNonce(chainId, account);

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(nonce).toBe(2);
  });
});
