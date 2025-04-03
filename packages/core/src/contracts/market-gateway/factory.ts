import { getConfig } from '../../configs';
import { ChainId, WalletProvider } from '../../types';
import MARKET_GATEWAY_ABI from '../abis/market-gateway.json';
import { Erc1155MarketGatewayContract } from './Erc1155MarketGatewayContract';
import { MarketGatewayContract } from './MarketGatewayContract';

export const createMarketGatewayContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const marketGatewayAddress = config.contractsAddress.marketGateway;
  return new MarketGatewayContract(marketGatewayAddress, MARKET_GATEWAY_ABI, provider);
};

export const createErc1155MarketGatewayContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const marketGatewayAddress = config.contractsAddress.marketGateway;
  return new Erc1155MarketGatewayContract(marketGatewayAddress, MARKET_GATEWAY_ABI, provider);
}; 