import { TypedDataDomain } from 'ethers';

import { ChainId, SpenderContractType } from '../types';

export interface Config {
  rpcEndpoint: string;
  chainId: number;
  chainName: string;
  contractsAddress: {
    katana: string;
    marketGateway: string;
    marketGatewayMultisend: string;
    marketCommission: string;
    multiCall: string;
  };
  marketGatewayDomain: TypedDataDomain;
  rnsAddress: string;
}

export type SpenderContractConfig = {
  [spenderContract in SpenderContractType]: string;
};

export const mainnetConfig: Config = {
  rpcEndpoint: 'https://api.roninchain.com/rpc',
  chainId: 2020,
  chainName: 'Mainnet',
  contractsAddress: {
    katana: '0x7d0556d55ca1a92708681e2e231733ebd922597d',
    marketGateway: '0x3b3adf1422f84254b7fbb0e7ca62bd0865133fe3',
    marketGatewayMultisend: '0x21a0a1c081dc2f3e48dc391786f53035f85ce0bc',
    marketCommission: '0x35d30aefe3d3620b644336229d1f3a2bffbf4917',
    multiCall: '0xc76d0d0d3aa608190f78db02bf2f5aef374fc0b9',
  },
  marketGatewayDomain: {
    name: 'MarketGateway',
    version: '1',
    chainId: 2020,
    verifyingContract: '0x3b3adf1422f84254b7fbb0e7ca62bd0865133fe3',
  },
  rnsAddress: '0x67c409dab0ee741a1b1be874bd1333234cfdbf44',
};

export const testnetConfig: Config = {
  rpcEndpoint: 'https://saigon-testnet.roninchain.com/rpc',
  chainId: 2021,
  chainName: 'Saigon Testnet',
  contractsAddress: {
    katana: '0xDa44546C0715ae78D454fE8B84f0235081584Fe0',
    marketGateway: '0x2488a13a4d635b0bacf7ef59911e54efeaf573eb',
    marketGatewayMultisend: '0x5079b2672284570d3f56b7244f5da109c782f940',
    marketCommission: '0x2884a655b143cea487387ff1e3ed3bf2b9dc52ae',
    multiCall: '0x31c9ef8a631e2489e69833df3b2cb4bf0dc413bc',
  },
  marketGatewayDomain: {
    name: 'MarketGateway',
    version: '1',
    chainId: 2021,
    verifyingContract: '0x2488a13a4d635b0bacf7ef59911e54efeaf573eb',
  },
  rnsAddress: '0xf0c99c9677eda0d13291c093b27e6512e4acdf83',
};

export const spenderContractMainnetConfig: SpenderContractConfig = {
  [SpenderContractType.MarketGatewayContract]: mainnetConfig.contractsAddress.marketGateway,
  [SpenderContractType.MarketGatewayMultiSendContract]: mainnetConfig.contractsAddress.marketGatewayMultisend,
};

export const spenderContractTestnetConfig: SpenderContractConfig = {
  [SpenderContractType.MarketGatewayContract]: testnetConfig.contractsAddress.marketGateway,
  [SpenderContractType.MarketGatewayMultiSendContract]: testnetConfig.contractsAddress.marketGatewayMultisend,
};

export const getConfig = (chainId: ChainId) => {
  if (chainId === ChainId.testnet) {
    return testnetConfig;
  }
  return mainnetConfig;
};

export const getSpenderContractConfig = (chainId: ChainId) => {
  if (chainId === ChainId.testnet) {
    return spenderContractTestnetConfig;
  }
  return spenderContractMainnetConfig;
};
