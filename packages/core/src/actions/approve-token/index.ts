import { BigNumber } from 'ethers';

import { getConfig } from '../../configs';
import { createErc20Contract, createErc721Contract, createErc1155Contract, createWRonContract } from '../../contracts';
import {
  ApproveErc20TokenParams,
  ApproveErc721TokenParams,
  ApproveErc1155TokenParams,
  ApproveTokenParams,
  ApproveTokenType,
  ApproveWRonTokenParams,
} from './types';

export * from './types';

export const approveWRonToken = async (params: ApproveWRonTokenParams) => {
  const { chainId, wallet, options } = params;
  const { provider, account } = wallet;
  const approvedValue = BigNumber.from('1').shl(256).sub(1).toString();

  const config = getConfig(chainId);
  const marketGatewayContract = config.contractsAddress.marketGateway;

  const wRonContract = createWRonContract(chainId, provider);
  return wRonContract.approve(marketGatewayContract, approvedValue, { ...options, from: account });
};

export const approveErc20Token = async (params: ApproveErc20TokenParams) => {
  const { chainId, wallet, address, options } = params;
  const { provider, account } = wallet;
  const approvedValue = BigNumber.from('1').shl(256).sub(1).toString();

  const config = getConfig(chainId);
  const marketGatewayContract = config.contractsAddress.marketGateway;

  const erc20Contract = createErc20Contract(address, provider);
  return erc20Contract.approve(marketGatewayContract, approvedValue, { ...options, from: account });
};

export const approveErc721Token = async (params: ApproveErc721TokenParams) => {
  const { chainId, wallet, address, options } = params;
  const { provider, account } = wallet;

  const config = getConfig(chainId);
  const marketGatewayContract = config.contractsAddress.marketGateway;

  const erc721Contract = createErc721Contract(address, provider);
  return erc721Contract.setApprovalForAll(marketGatewayContract, true, { ...options, from: account });
};

export const approveErc1155Token = async (params: ApproveErc1155TokenParams) => {
  const { chainId, wallet, address, options } = params;
  const { provider, account } = wallet;

  const config = getConfig(chainId);
  const marketGatewayContract = config.contractsAddress.marketGateway;

  const erc1155Contract = createErc1155Contract(address, provider);
  return erc1155Contract.setApprovalForAll(marketGatewayContract, true, { ...options, from: account });
};

export const approveToken = (params: ApproveTokenParams) => {
  const { tokenType, ...otherParams } = params;
  if (tokenType === ApproveTokenType.Erc20) {
    return approveErc20Token(otherParams);
  }

  if (tokenType === ApproveTokenType.Erc721) {
    return approveErc721Token(otherParams);
  }

  if (tokenType === ApproveTokenType.Erc1155) {
    return approveErc721Token(otherParams);
  }

  return approveWRonToken(otherParams);
};
