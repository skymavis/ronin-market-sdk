import { getConfig } from '../../configs';
import {
  createErc20Contract,
  createErc721Contract,
  createErc1155Contract,
  createReadOnlyProvider,
  createWRonContract,
} from '../../contracts';
import { ChainId, SpenderContractType } from '../../types';
import { getSpenderContractAddress } from '../../utils';
import { Token } from './data';
import { getPaymentTokens } from './getPaymentTokens';

export const checkIsErc721Approved = (chainId: ChainId, account: string, address: string) => {
  const readProvider = createReadOnlyProvider(chainId);
  const config = getConfig(chainId);
  const erc721Contract = createErc721Contract(address);
  const marketGatewayContractAddress = config.contractsAddress.marketGateway;
  return erc721Contract.connect(readProvider).isApprovedForAll(account, marketGatewayContractAddress);
};

export const checkIsErc1155Approved = (chainId: ChainId, account: string, address: string) => {
  const readProvider = createReadOnlyProvider(chainId);
  const config = getConfig(chainId);
  const erc1155Contract = createErc1155Contract(address);
  const marketGatewayContractAddress = config.contractsAddress.marketGateway;
  return erc1155Contract.connect(readProvider).isApprovedForAll(account, marketGatewayContractAddress);
};

export const checkIsErc20Approved = async (
  chainId: ChainId,
  account: string,
  address: string,
  amount: string,
  spenderContract?: SpenderContractType,
) => {
  const tokens = getPaymentTokens(chainId);
  const isRon = tokens[Token.RON].address.toLowerCase() === address.toLowerCase();

  if (isRon) {
    return true;
  }

  const spenderAddress = getSpenderContractAddress(chainId, spenderContract);
  const erc20Contract = createErc20Contract(address);
  const readProvider = createReadOnlyProvider(chainId);
  const response = await erc20Contract.connect(readProvider).allowance(account, spenderAddress);

  return response.gte(amount);
};

export const checkIsWRonTokenApproved = async (chainId: ChainId, account: string, amount: string) => {
  const config = getConfig(chainId);
  const marketGatewayContractAddress = config.contractsAddress.marketGateway;

  const wRonContract = createWRonContract(chainId);
  const readProvider = createReadOnlyProvider(chainId);
  const response = await wRonContract.connect(readProvider).allowance(account, marketGatewayContractAddress);

  return response.gte(amount);
};
