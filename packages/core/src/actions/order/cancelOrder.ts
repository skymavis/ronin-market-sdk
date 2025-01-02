import { createErc1155MarketGatewayContract, createMarketGatewayContract } from '../../contracts';
import { Erc, getOrderByHash } from '../../queries';
import { generateErc721Order, generateErc1155Order } from '../../services';
import { CancelErc721OrderParams, CancelErc1155OrderParams, CancelOrderParams } from './types';

export const cancelErc721Order = async (params: CancelErc721OrderParams) => {
  const { chainId, wallet, order, options } = params;
  const { provider } = wallet;

  if (!order) {
    throw new Error('Order not found');
  }

  const marketGatewayContract = createMarketGatewayContract(chainId, provider);
  const erc721Order = generateErc721Order(order);
  return marketGatewayContract.cancelOrder(erc721Order, options);
};

export const cancelErc1155Order = async (params: CancelErc1155OrderParams) => {
  const { chainId, wallet, order, options } = params;
  const { provider } = wallet;

  if (!order) {
    throw new Error('Order not found');
  }

  const erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId, provider);
  const erc1155Order = generateErc1155Order(order);
  return erc1155MarketGatewayContract.cancelErc1155Order(erc1155Order, options);
};

export const cancelOrder = async (params: CancelOrderParams) => {
  const { hash, ...otherParams } = params;

  const order = await getOrderByHash({ hash, chainId: params.chainId });
  if (!order) {
    throw new Error('Order not found');
  }

  const ercType = order.assets?.[0]?.erc;
  if (ercType === Erc.Erc721) {
    return cancelErc721Order({ ...otherParams, order });
  }

  return cancelErc1155Order({ ...otherParams, order });
};
