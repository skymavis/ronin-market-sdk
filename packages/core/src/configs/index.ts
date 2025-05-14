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
    collectionOffer: string;
    royaltyRegistry: string;
    multiCall: string;
  };
  marketGatewayDomain: TypedDataDomain;
  collectionOfferDomain: TypedDataDomain;
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
    multiCall: '0xc76d0d0d3aa608190f78db02bf2f5aef374fc0b9',
    collectionOffer: '0x3ef234bc2a04d86f6041e419458d9acbd077f2c1',
    royaltyRegistry: '0x5afa3e25a620c66bb401e916680316ec80cba676',
  },
  marketGatewayDomain: {
    name: 'MarketGateway',
    version: '1',
    chainId: 2020,
    verifyingContract: '0x3b3adf1422f84254b7fbb0e7ca62bd0865133fe3',
  },
  collectionOfferDomain: {
    name: 'CollectionOffer',
    version: '1',
    chainId: 2020,
    verifyingContract: '0x3ef234bc2a04d86f6041e419458d9acbd077f2c1',
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
    multiCall: '0x31c9ef8a631e2489e69833df3b2cb4bf0dc413bc',
    collectionOffer: '0x600d33dbf78a97c1b6a02efbebcbd7f83a04acc5',
    royaltyRegistry: '0x7249a5d0375800189bba9dc38e7d8f613fe1c57d',
  },
  marketGatewayDomain: {
    name: 'MarketGateway',
    version: '1',
    chainId: 2021,
    verifyingContract: '0x2488a13a4d635b0bacf7ef59911e54efeaf573eb',
  },
  collectionOfferDomain: {
    name: 'CollectionOffer',
    version: '1',
    chainId: 2021,
    verifyingContract: '0x600d33dbf78a97c1b6a02efbebcbd7f83a04acc5',
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
