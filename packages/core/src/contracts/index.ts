import { Contract, ContractInterface, ethers } from 'ethers';

import { getConfig } from '../configs';
import { wRonToken } from '../services/tokens/data';
import { ChainId, Signer, WalletProvider } from '../types';
import COLLECTION_OFFER_ABI from './abis/collection-offer.json';
import ERC20_ABI from './abis/erc20.json';
import ERC721_ABI from './abis/erc721.json';
import ERC1155_ABI from './abis/erc1155.json';
import KATANA_ABI from './abis/katana.json';
import MARKET_GATEWAY_MULTISEND_ABI from './abis/market-gateway-multisend.json';
import ROYALTY_REGISTRY_ABI from './abis/royalty-registry.json';
import { CollectionOffer, Erc20, Erc721, Erc1155, RoyaltyRegistry, Wron } from './abis/types/v5';
import WRON_ABI from './abis/wron.json';
import { KatanaContract } from './KatanaContract';
import { MarketGatewayMultisendContract } from './market-gateway';

export * from './abis/types/v5';
export * from './KatanaContract';
export * from './market-gateway';

export const createContract = <Type>(
  contractAddress: string,
  ABI: ContractInterface,
  signerOrProvider?: Signer | WalletProvider,
) => {
  return new Contract(contractAddress, ABI, signerOrProvider) as Type;
};

export const createErc721Contract = (contractAddress: string, provider?: WalletProvider) => {
  return createContract<Erc721>(contractAddress, ERC721_ABI, provider);
};

export const createErc1155Contract = (contractAddress: string, provider?: WalletProvider) => {
  return createContract<Erc1155>(contractAddress, ERC1155_ABI, provider);
};

export const createErc20Contract = (contractAddress: string, provider?: WalletProvider) => {
  return createContract<Erc20>(contractAddress, ERC20_ABI, provider);
};

export const createKatanaContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const katanaContractAddress = config.contractsAddress.katana;
  return new KatanaContract(katanaContractAddress, KATANA_ABI, provider);
};

export const createCollectionOfferContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const collectionOfferAddress = config.contractsAddress.collectionOffer;
  return createContract<CollectionOffer>(collectionOfferAddress, COLLECTION_OFFER_ABI, provider);
};

export const createRoyaltyRegistryContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const royaltyRegistryAddress = config.contractsAddress.royaltyRegistry;
  return createContract<RoyaltyRegistry>(royaltyRegistryAddress, ROYALTY_REGISTRY_ABI, provider);
};

export const createMarketGatewayMultiSendContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const marketGatewayMultisendAddress = config.contractsAddress.marketGatewayMultisend;
  return new MarketGatewayMultisendContract(marketGatewayMultisendAddress, MARKET_GATEWAY_MULTISEND_ABI, provider);
};

export const createWRonContract = (chainId: ChainId, provider?: WalletProvider) => {
  const wRonAddress = wRonToken[chainId].address;
  return createContract<Wron>(wRonAddress, WRON_ABI, provider);
};

export const createReadOnlyProvider = (chainId: ChainId) => {
  const config = getConfig(chainId);
  return new ethers.providers.StaticJsonRpcProvider(config.rpcEndpoint, chainId);
};
