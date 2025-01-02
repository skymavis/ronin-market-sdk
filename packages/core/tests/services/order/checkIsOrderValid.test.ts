import {
  checkIsErc721OrderValid,
  checkIsErc1155OrderValid,
  createMarketGatewayContract,
  createReadOnlyProvider,
  generateErc721Order,
  generateErc1155Order,
} from '../../../src';
import { chainId, erc721Order, erc1155Order } from '../../data-mock';

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

  const mockErc1155MarketGatewayContract = jest.fn().mockImplementation(() => {
    return {
      encodeErc1155Order: jest.fn(),
      interface: {
        encodeFunctionData: jest.fn(),
      },
    };
  });

  return {
    createMarketGatewayContract: mockMarketGatewayContract,
    createErc1155MarketGatewayContract: mockErc1155MarketGatewayContract,
    createReadOnlyProvider: mockCreateProvider,
  };
});

jest.mock('../../../src/contracts/abis/types/v5', () => {
  const mockMavisExchangeFactory = {
    createInterface: jest.fn().mockImplementation(() => ({
      encodeFunctionData: jest.fn(),
      decodeFunctionResult: jest.fn().mockImplementation(() => [true]),
    })),
  };

  return {
    MavisExchange__factory: mockMavisExchangeFactory,
    Erc1155OrderExchange__factory: mockMavisExchangeFactory,
  };
});

jest.mock('../../../src/services/order/generateOrderData', () => ({
  generateErc721Order: jest.fn(),
  generateErc1155Order: jest.fn(),
}));

describe('test check is order valid', () => {
  test('check is erc721 order valid', async () => {
    const isOrderValid = await checkIsErc721OrderValid(chainId, erc721Order);

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc721Order).toHaveBeenCalled();
    expect(isOrderValid).toBe(true);
  });

  test('check is erc1155 order valid', async () => {
    const isOrderValid = await checkIsErc1155OrderValid(chainId, erc1155Order);

    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc1155Order).toHaveBeenCalled();
    expect(isOrderValid).toBe(true);
  });
});
