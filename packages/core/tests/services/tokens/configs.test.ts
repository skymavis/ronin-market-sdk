import { paymentTokens } from '../../../src';
import { getSwapConfig } from '../../../src/services/tokens/configs';
import { chainId } from '../../data-mock/index';

const ronAddress = paymentTokens[chainId].RON.address;
const axsAddress = paymentTokens[chainId].AXS.address;
const slpAddress = paymentTokens[chainId].SLP.address;
const usdcAddress = paymentTokens[chainId].USDC.address;
const wethAddress = paymentTokens[chainId].WETH.address;

describe('test token configs', () => {
  test('get swap to ron config', () => {
    const config = getSwapConfig(chainId, ronAddress);
    const axsConfig = config[axsAddress];
    const slpConfig = config[slpAddress];
    const usdcConfig = config[usdcAddress];
    const wethConfig = config[wethAddress];

    expect(axsConfig.route).toBe('AXS > RON');
    expect(slpConfig.route).toBe('SLP > RON');
    expect(usdcConfig.route).toBe('USDC > RON');
    expect(wethConfig.route).toBe('WETH > RON');
  });

  test('get swap to usdc config', () => {
    const config = getSwapConfig(chainId, usdcAddress);
    const axsConfig = config[axsAddress];
    const slpConfig = config[slpAddress];
    const ronConfig = config[ronAddress];
    const wethConfig = config[wethAddress];

    expect(axsConfig.route).toBe('AXS > RON > USDC');
    expect(slpConfig.route).toBe('SLP > RON > USDC');
    expect(ronConfig.route).toBe('RON > USDC');
    expect(wethConfig.route).toBe('WETH > RON > USDC');
  });

  test('get swap to weth config', () => {
    const config = getSwapConfig(chainId, wethAddress);
    const axsConfig = config[axsAddress];
    const slpConfig = config[slpAddress];
    const ronConfig = config[ronAddress];
    const usdcConfig = config[usdcAddress];

    expect(axsConfig.route).toBe('AXS > RON > WETH');
    expect(slpConfig.route).toBe('SLP > RON > WETH');
    expect(ronConfig.route).toBe('RON > WETH');
    expect(usdcConfig.route).toBe('USDC > RON > WETH');
  });

  test('get swap config with incorrect address', () => {
    try {
      getSwapConfig(chainId, slpAddress);
    } catch (error) {
      expect(error).toEqual(new Error('Token must be USDC, WETH or RON'));
    }
  });
});
