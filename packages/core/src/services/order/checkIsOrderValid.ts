import {
  createErc1155MarketGatewayContract,
  createMarketGatewayContract,
  createReadOnlyProvider,
} from '../../contracts';
import { Erc1155OrderExchange__factory, MavisExchange__factory } from '../../contracts/abis/types/v5';
import { Order, OrderStatus } from '../../queries';
import { ChainId } from '../../types';
import { generateErc721Order, generateErc1155Order } from './generateOrderData';

export const checkIsErc721OrderValid = async (chainId: ChainId, order: Order) => {
  const { hash } = order;
  const formattedHash = hash.includes('0x') ? hash : `0x${hash}`;
  const erc721Order = generateErc721Order(order);
  const readProvider = createReadOnlyProvider(chainId);
  const marketGatewayContract = createMarketGatewayContract(chainId);
  const encodedOrder = marketGatewayContract.encodeOrder(erc721Order);
  const params = MavisExchange__factory.createInterface().encodeFunctionData('orderValid', [
    formattedHash,
    encodedOrder,
  ]);
  const encodedResponse = await readProvider.call({
    to: marketGatewayContract.address,
    data: marketGatewayContract.interface.encodeFunctionData('interactWith', [
      marketGatewayContract._orderExchangeInterface,
      params,
    ]),
  });

  const result = MavisExchange__factory.createInterface().decodeFunctionResult('orderValid', encodedResponse);
  return result?.[0] === true;
};

export const checkIsErc1155OrderValid = async (chainId: ChainId, order: Order) => {
  const { hash, orderStatus } = order;
  const formattedHash = hash.includes('0x') ? hash : `0x${hash}`;

  const invalidStatusList = [OrderStatus.INVALID_ITEM_AMOUNT];
  const isInvalidOrder = invalidStatusList.includes(orderStatus);

  if (isInvalidOrder) {
    return false;
  }

  const erc1155Order = generateErc1155Order(order);
  const readProvider = createReadOnlyProvider(chainId);
  const erc1155marketGatewayContract = createErc1155MarketGatewayContract(chainId);
  const encodedOrder = erc1155marketGatewayContract.encodeErc1155Order(erc1155Order);
  const params = Erc1155OrderExchange__factory.createInterface().encodeFunctionData('orderValid', [
    formattedHash,
    encodedOrder,
  ]);

  const encodedResponse = await readProvider.call({
    to: erc1155marketGatewayContract.address,
    data: erc1155marketGatewayContract.interface.encodeFunctionData('interactWith', [
      erc1155marketGatewayContract._orderExchangeInterface,
      params,
    ]),
  });

  const result = Erc1155OrderExchange__factory.createInterface().decodeFunctionResult('orderValid', encodedResponse);
  return result?.[0] === true;
};
