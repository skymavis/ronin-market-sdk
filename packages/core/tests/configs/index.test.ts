import { ChainId, getConfig } from '../../src';

describe('test configs', () => {
  test('get testnet config', () => {
    const testnetConfig = getConfig(ChainId.testnet);

    expect(testnetConfig.chainId).toBe(ChainId.testnet);
  });

  test('get mainnet config', () => {
    const mainnetConfig = getConfig(ChainId.mainnet);

    expect(mainnetConfig.chainId).toBe(ChainId.mainnet);
  });
});
