import { convertAmountToUsd } from '../../src/utils/convertPrice';
import { exchangeRate } from '../data-mock/exchangeRate';

describe('test convert price', () => {
  test('convert amount to usd', () => {
    const amount = 1000;
    const ronSymbol = 'RON';

    const usdPrice = convertAmountToUsd(amount, ronSymbol, exchangeRate);
    expect(usdPrice).toBe(1000);
  });
});
