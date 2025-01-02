import {
  Erc721Order,
  Erc1155Order,
  generateErc721Order,
  generateErc1155Order,
  generateInputOrder,
  getErcAssetItem,
  getErcType,
  getOrderKind,
  InputOrder,
} from '../../../src';
import { auctionData, erc721Order, erc1155Order } from '../../data-mock';

jest.mock('../../../src/utils', () => {
  return {
    getOrderKind: jest.fn(),
    getErcAssetItem: jest.fn(),
    getErcType: jest.fn(),
  };
});

describe('test generate order data', () => {
  test('generate erc721 order', async () => {
    const order = await generateErc721Order(erc721Order);
    expect(getOrderKind).toHaveBeenCalled();
    expect(getErcAssetItem).toHaveBeenCalled();
    expect(typeof order).toBeInstanceOf<Erc721Order>;
  });

  test('generate erc1155 order', async () => {
    const order = await generateErc1155Order(erc1155Order);
    expect(getOrderKind).toHaveBeenCalled();
    expect(getErcAssetItem).toHaveBeenCalled();
    expect(typeof order).toBeInstanceOf<Erc1155Order>;
  });

  test('generate input order', async () => {
    const inputOrder = await generateInputOrder(auctionData);
    expect(getErcType).toHaveBeenCalled();
    expect(typeof inputOrder).toBeInstanceOf<InputOrder>;
  });
});
