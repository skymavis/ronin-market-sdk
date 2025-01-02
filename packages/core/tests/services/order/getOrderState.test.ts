import {
  createErc1155MarketGatewayContract,
  createMarketGatewayContract,
  createReadOnlyProvider,
  ErcAssetItem,
  getErc721OrderState,
  getErc1155OrderState,
} from '../../../src';
import { chainId } from '../../data-mock';

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
      decodeFunctionResult: jest.fn().mockImplementation(() => ['order_state']),
    })),
  };

  return {
    MavisExchange__factory: mockMavisExchangeFactory,
    Erc1155OrderExchange__factory: mockMavisExchangeFactory,
  };
});

describe('test get order state', () => {
  test('get erc721 order state', async () => {
    const orderState = await getErc721OrderState(chainId, [
      {
        erc: ErcAssetItem.Erc721,
        addr: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
        id: '982',
        quantity: 0,
      },
    ]);

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(orderState).toBe('order_state');
  });

  test('get erc1155 order state', async () => {
    const orderState = await getErc1155OrderState(chainId, [
      {
        erc: ErcAssetItem.Erc1155,
        addr: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
        id: '982',
        quantity: 0,
      },
    ]);

    expect(createErc1155MarketGatewayContract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(orderState).toBe('order_state');
  });
});
