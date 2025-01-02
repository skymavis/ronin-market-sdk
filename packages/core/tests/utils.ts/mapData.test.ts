import { Erc, ErcAssetItem, getErcAssetItem, getErcType, getOrderKind, OrderKind, OrderType } from '../../src';
import { getRate } from '../../src/utils/mapData';
import { exchangeRate } from '../data-mock';

describe('test get order kind', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('order type is offer', async () => {
    const orderKind = getOrderKind(OrderType.Offer);
    expect(orderKind).toBe(OrderKind.Offer);
  });

  test('order type is sell', async () => {
    const orderKind = getOrderKind(OrderType.Sell);
    expect(orderKind).toBe(OrderKind.Sell);
  });
});

describe('test get erc asset item type', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('erc type is erc20', async () => {
    const data = getErcAssetItem(Erc.Erc20);
    expect(data).toBe(ErcAssetItem.Erc20);
  });

  test('erc type is erc1155', async () => {
    const data = getErcAssetItem(Erc.Erc1155);
    expect(data).toBe(ErcAssetItem.Erc1155);
  });

  test('erc type is erc721', async () => {
    const data = getErcAssetItem(Erc.Erc721);
    expect(data).toBe(ErcAssetItem.Erc721);
  });
});

describe('test get erc type', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('erc asset item type is erc20', async () => {
    const data = getErcType(ErcAssetItem.Erc20);
    expect(data).toBe(Erc.Erc20);
  });

  test('erc asset item type is erc1155', async () => {
    const data = getErcType(ErcAssetItem.Erc1155);
    expect(data).toBe(Erc.Erc1155);
  });

  test('erc asset item type is erc721', async () => {
    const data = getErcType(ErcAssetItem.Erc721);
    expect(data).toBe(Erc.Erc721);
  });

  test('get rate', () => {
    const ronSymbol = 'RON';
    const rate = getRate(ronSymbol, exchangeRate);

    expect(rate).toBe(1);
  });
});
