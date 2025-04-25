import { BytesLike } from '@ethersproject/bytes';
import { BaseContract, BigNumberish, ethers } from 'ethers';

import { getConfig } from '../../configs';
import { Token } from '../../services/tokens/data';
import { getPaymentTokens } from '../../services/tokens/getPaymentTokens';
import { ChainId, Erc721Order, OrderKind, WalletProvider } from '../../types';
import MARKET_GATEWAY_ABI from '../abis/market-gateway.json';
import { MavisExchange__factory } from '../abis/types/v5';
import { SettleParameterStruct } from '../abis/types/v5/MavisExchange';

export interface SettleOrderContractParams {
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  referralAddr: string;
  signature: BytesLike;
  order: Erc721Order;
  account: string;
  chainId: ChainId;
  options?: ethers.Overrides;
}

export interface SwapSettleOrderContractParams {
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  referralAddr: string;
  deadline: BigNumberish;
  path: string[];
  signature: BytesLike;
  order: Erc721Order;
  account: string;
  options?: ethers.Overrides;
}

export interface OrderValidContractParams {
  hash: BytesLike;
  order: Erc721Order;
}

export class MarketGatewayContract extends BaseContract {
  public _orderExchangeInterface = 'ORDER_EXCHANGE';

  encodeOrder(order: Erc721Order): string {
    const orderTypes = [
      '(address maker, uint8 kind, (uint8 erc,address addr,uint256 id,uint256 quantity)[] assets, uint256 expiredAt, address paymentToken, uint256 startedAt, uint256 basePrice, uint256 endedAt, uint256 endedPrice, uint256 expectedState, uint256 nonce, uint256 marketFeePercentage)',
    ];

    return ethers.utils.defaultAbiCoder.encode(orderTypes, [order]);
  }

  encodeParamsForSwapSettleErc721Order(
    orderInfo: SettleParameterStruct,
    settlePrice: BigNumberish,
    deadline: BigNumberish,
    path: string[],
  ) {
    return MavisExchange__factory.createInterface().encodeFunctionData('swapTokensAndSettleOrder', [
      orderInfo,
      settlePrice,
      deadline,
      path,
    ]);
  }

  encodeParamsForSettleErc721Order(orderInfo: SettleParameterStruct, settlePrice: BigNumberish) {
    return MavisExchange__factory.createInterface().encodeFunctionData('settleOrder', [orderInfo, settlePrice]);
  }

  encodeParamsForSwapRonAndSettleErc721Order(orderInfo: SettleParameterStruct, deadline: BigNumberish, path: string[]) {
    return MavisExchange__factory.createInterface().encodeFunctionData('swapRONAndSettleOrder', [
      orderInfo,
      deadline,
      path,
    ]);
  }

  async settleOrder(params: SettleOrderContractParams) {
    const { order, signature, referralAddr, expectedState, account, settlePrice, chainId, options } = params;
    const { kind, maker, paymentToken } = order;
    const encodedOrder = this.encodeOrder(order);
    const recipient = kind === OrderKind.Offer ? maker : account;
    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient,
      refunder: account,
    };
    const tokens = getPaymentTokens(chainId);
    const isSettlingWithRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();
    const encodeParams = this.encodeParamsForSettleErc721Order(orderInfo, settlePrice);

    if (isSettlingWithRon) {
      return this.functions.interactWith(this._orderExchangeInterface, encodeParams, {
        value: settlePrice,
        ...options,
      });
    }

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, { ...options });
  }

  async swapTokensAndSettleOrder(params: SwapSettleOrderContractParams) {
    const { order, signature, referralAddr, expectedState, settlePrice, deadline, path, account, options } = params;
    const encodedOrder = this.encodeOrder(order);
    const recipient = order.kind === OrderKind.Offer ? order.maker : account;
    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient,
      refunder: account,
    };

    const encodeParams = this.encodeParamsForSwapSettleErc721Order(orderInfo, settlePrice, deadline, path);

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, { ...options });
  }

  async swapRONAndSettleOrder(params: SwapSettleOrderContractParams) {
    const { order, signature, referralAddr, expectedState, deadline, path, account, options } = params;
    const encodedOrder = this.encodeOrder(order);
    const recipient = order.kind === OrderKind.Offer ? order.maker : account;
    const settleInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient,
      refunder: account,
    };

    const encodeParams = this.encodeParamsForSwapRonAndSettleErc721Order(settleInfo, deadline, path);

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, {
      value: params.settlePrice,
      ...options,
    });
  }

  async cancelOrder(order: Erc721Order, options?: ethers.Overrides) {
    const encodedOrder = this.encodeOrder(order);
    const encodeParams = MavisExchange__factory.createInterface().encodeFunctionData('cancelOrder', [encodedOrder]);

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, {
      ...options,
    });
  }
}

export const createMarketGatewayContract = (chainId: ChainId, provider?: WalletProvider) => {
  const config = getConfig(chainId);
  const marketGatewayAddress = config.contractsAddress.marketGateway;
  return new MarketGatewayContract(marketGatewayAddress, MARKET_GATEWAY_ABI, provider);
};
