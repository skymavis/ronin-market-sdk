import {
  createErc1155MarketGatewayContract,
  createMarketGatewayContract,
  createReadOnlyProvider,
} from '../../contracts';
import { Erc1155OrderExchange__factory, MavisExchange__factory } from '../../contracts/abis/types/v5';
import { ChainId, OrderAssetItem } from '../../types';

export const getErc721OrderState = async (chainId: ChainId, orderAssetItem: OrderAssetItem[]) => {
  const marketGatewayContract = createMarketGatewayContract(chainId);
  const readProvider = createReadOnlyProvider(chainId);

  const params = MavisExchange__factory.createInterface().encodeFunctionData('getState', [orderAssetItem]);

  const encodedResponse = await readProvider.call({
    to: marketGatewayContract.address,
    data: marketGatewayContract.interface.encodeFunctionData('interactWith', [
      marketGatewayContract._orderExchangeInterface,
      params,
    ]),
  });

  const result = MavisExchange__factory.createInterface().decodeFunctionResult('getState', encodedResponse);

  return result?.[0]?.toString();
};

export const getErc1155OrderState = async (chainId: ChainId, orderAssetItem: OrderAssetItem[]) => {
  const erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId);
  const readProvider = createReadOnlyProvider(chainId);

  const params = Erc1155OrderExchange__factory.createInterface().encodeFunctionData('getState', [orderAssetItem]);

  const encodedResponse = await readProvider.call({
    to: erc1155MarketGatewayContract.address,
    data: erc1155MarketGatewayContract.interface.encodeFunctionData('interactWith', [
      erc1155MarketGatewayContract._orderExchangeInterface,
      params,
    ]),
  });

  const result = Erc1155OrderExchange__factory.createInterface().decodeFunctionResult('getState', encodedResponse);

  return result?.[0]?.toString();
};
