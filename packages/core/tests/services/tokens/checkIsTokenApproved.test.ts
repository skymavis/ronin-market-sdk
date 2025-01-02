import { BigNumber } from 'ethers';

import {
  checkIsErc20Approved,
  checkIsErc721Approved,
  checkIsErc1155Approved,
  checkIsWRonTokenApproved,
  createErc20Contract,
  createErc721Contract,
  createErc1155Contract,
  createReadOnlyProvider,
  createWRonContract,
  paymentTokens,
} from '../../../src';
import { account, chainId, erc721TokenAddress, erc1155TokenAddress } from '../../data-mock';

jest.mock('../../../src/contracts', () => {
  const mockCreateProvider = jest.fn().mockImplementation(() => {
    return {
      call: jest.fn(),
    };
  });

  const mockCreateErcContract = jest.fn().mockImplementation(() => {
    return {
      connect: jest.fn().mockImplementation(() => {
        return {
          isApprovedForAll: jest.fn().mockImplementation(() => false),
        };
      }),
    };
  });

  const mockCreateErc20Contract = jest.fn().mockImplementation(() => {
    return {
      connect: jest.fn().mockImplementation(() => {
        return {
          allowance: jest.fn().mockImplementation(() => BigNumber.from(1)),
        };
      }),
    };
  });

  return {
    createErc721Contract: mockCreateErcContract,
    createErc1155Contract: mockCreateErcContract,
    createWRonContract: mockCreateErc20Contract,
    createErc20Contract: mockCreateErc20Contract,
    createReadOnlyProvider: mockCreateProvider,
  };
});

describe('test check token is approved', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('check erc721 is approved', () => {
    const isApproved = checkIsErc721Approved(chainId, account, erc721TokenAddress);

    expect(isApproved).toBe(false);
    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createErc721Contract).toHaveBeenCalled();
  });

  test('check erc1155 is approved', () => {
    const isApproved = checkIsErc1155Approved(chainId, account, erc1155TokenAddress);

    expect(isApproved).toBe(false);
    expect(createReadOnlyProvider).toHaveBeenCalled();
    expect(createErc1155Contract).toHaveBeenCalled();
  });

  test('check ron is approved', async () => {
    const ronAddress = paymentTokens[chainId].RON.address;
    const isApproved = await checkIsErc20Approved(chainId, account, ronAddress, '1');

    expect(isApproved).toBe(true);
    expect(createErc20Contract).not.toHaveBeenCalled();
    expect(createReadOnlyProvider).not.toHaveBeenCalled();
  });

  test('check weth is approved', async () => {
    const wethAddress = paymentTokens[chainId].WETH.address;
    const isApproved = await checkIsErc20Approved(chainId, account, wethAddress, '2');

    expect(isApproved).toBe(false);
    expect(createErc20Contract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();
  });

  test('check weth is approved', async () => {
    const wethAddress = paymentTokens[chainId].WETH.address;
    const isApproved = await checkIsErc20Approved(chainId, account, wethAddress, '2');

    expect(isApproved).toBe(false);
    expect(createErc20Contract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();
  });

  test('check wRon is approved', async () => {
    const isApproved = await checkIsWRonTokenApproved(chainId, account, '2');

    expect(isApproved).toBe(false);
    expect(createWRonContract).toHaveBeenCalled();
    expect(createReadOnlyProvider).toHaveBeenCalled();
  });
});
