import { paymentTokens } from '../../../src';
import { getTokensNeedToApprove } from '../../../src/services/tokens/getTokensNeedToApprove';
import { chainId } from '../../data-mock';
import { account } from '../../data-mock/profile';

jest.mock('../../../src/services/tokens/checkIsTokenApproved', () => ({
  checkIsErc20Approved: jest.fn().mockImplementation(() => false),
}));

describe('test get tokens need to approve', () => {
  test('get tokens need to approve', async () => {
    const wethToken = paymentTokens[chainId].WETH;
    const usdcToken = paymentTokens[chainId].USDC;
    const ronToken = paymentTokens[chainId].RON;

    const wethAddress = wethToken.address;
    const usdcAddress = usdcToken.address;

    const tokensNeedToApprove = await getTokensNeedToApprove(
      chainId,
      account,
      wethAddress,
      usdcAddress,
      '100000000000000',
    );

    expect(tokensNeedToApprove.length).toBe(3);
    expect(tokensNeedToApprove[0]).toEqual(wethToken);
    expect(tokensNeedToApprove[1]).toEqual(ronToken);
    expect(tokensNeedToApprove[2]).toEqual(usdcToken);
  });
});
