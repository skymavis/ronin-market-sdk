import { BigNumber } from 'ethers';

import {
  createMarketGatewayContract,
  generateErc721Order,
  generateErc1155Order,
  getSettlePrice,
  getSwappedAmount,
  paymentTokens,
  settleErc721Order,
  settleErc1155Order,
  swapRONAndSettleErc721Order,
  swapRONAndSettleErc1155Order,
  swapTokensAndSettleErc721Order,
  swapTokensAndSettleErc1155Order,
  Token,
  WalletClient,
} from '../../../src';
import { account, chainId, erc721Order, erc1155Order } from '../../data-mock';

const ronAddress = paymentTokens[chainId][Token.RON].address;
const wethAddress = paymentTokens[chainId][Token.WETH].address;

jest.mock('../../../src/services/order/getSwapTokenData', () => ({
  getSwappedAmount: jest.fn().mockImplementation(() => BigNumber.from('3000000000000000000')),
}));

jest.mock('../../../src/services/order/generateOrderData', () => ({
  generateErc721Order: jest.fn(),
  generateErc1155Order: jest.fn(),
}));

jest.mock('../../../src/contracts', () => {
  const mockCreateMarketGatewayContract = jest.fn().mockImplementation(() => {
    return {
      settleOrder: jest.fn().mockImplementation(() => 'Settle erc721 order successfully'),
      swapTokensAndSettleOrder: jest.fn().mockImplementation(() => 'Swap and settle erc721 order successfully'),
      swapRONAndSettleOrder: jest.fn().mockImplementation(() => 'Swap ron and settle erc721 order successfully'),
    };
  });

  const mockCreateErc1155MarketGatewayContract = jest.fn().mockImplementation(() => {
    return {
      settleErc1155Order: jest.fn().mockImplementation(() => 'Settle erc1155 order successfully'),
      swapTokensAndSettleErc1155Order: jest.fn().mockImplementation(() => 'Swap and settle erc1155 order successfully'),
      swapRONAndSettleErc1155Order: jest
        .fn()
        .mockImplementation(() => 'Swap ron and settle erc1155 order successfully'),
    };
  });

  return {
    createMarketGatewayContract: mockCreateMarketGatewayContract,
    createErc1155MarketGatewayContract: mockCreateErc1155MarketGatewayContract,
  };
});

describe('test settle order', () => {
  test('get settle price with selected token = listing token', async () => {
    const amount = '1000000000000000000';
    const settlePrice = await getSettlePrice(chainId, ronAddress, ronAddress, amount);
    expect(settlePrice).toBe(amount);
  });

  test('get settle price with selected token != listing token', async () => {
    const amount = '1000000000000000000';
    const settlePrice = await getSettlePrice(chainId, wethAddress, ronAddress, amount);

    expect(getSwappedAmount).toHaveBeenCalled();
    expect(settlePrice).toBe('3030000000000000000');
  });

  test('settle erc721 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = settleErc721Order(chainId, wallet, erc721Order, settlePrice, '0x');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc721Order).toHaveBeenCalled();
    expect(response).toBe('Settle erc721 order successfully');
  });

  test('swap tokens and settle erc721 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = swapTokensAndSettleErc721Order(chainId, wallet, erc721Order, settlePrice, [], '', '');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc721Order).toHaveBeenCalled();
    expect(response).toBe('Swap and settle erc721 order successfully');
  });

  test('swap ron and settle erc721 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = swapRONAndSettleErc721Order(chainId, wallet, erc721Order, settlePrice, [], '', '');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc721Order).toHaveBeenCalled();
    expect(response).toBe('Swap ron and settle erc721 order successfully');
  });

  test('settle erc1155 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = settleErc1155Order(chainId, wallet, erc1155Order, settlePrice, 1, '0x');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc1155Order).toHaveBeenCalled();
    expect(response).toBe('Settle erc1155 order successfully');
  });

  test('swap tokens and settle erc1155 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = swapTokensAndSettleErc1155Order(chainId, wallet, erc1155Order, settlePrice, [], 1, '', '');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc1155Order).toHaveBeenCalled();
    expect(response).toBe('Swap and settle erc1155 order successfully');
  });

  test('swap ron and settle erc1155 order', () => {
    const settlePrice = '1000000000000000000';
    const wallet = { provider: {}, account } as WalletClient;
    const response = swapRONAndSettleErc1155Order(chainId, wallet, erc1155Order, settlePrice, [], 1, '', '');

    expect(createMarketGatewayContract).toHaveBeenCalled();
    expect(generateErc1155Order).toHaveBeenCalled();
    expect(response).toBe('Swap ron and settle erc1155 order successfully');
  });
});
