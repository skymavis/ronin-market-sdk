import { BigNumberish, BytesLike, ethers } from 'ethers';

import { Token } from '../../services/tokens/data';
import { getPaymentTokens } from '../../services/tokens/getPaymentTokens';
import { ChainId, Erc1155Order } from '../../types';
import { Erc1155OrderExchange__factory } from '../abis/types/v5';
import { SettleParameterStruct } from '../abis/types/v5/Erc1155OrderExchange';
import { MarketGatewayContract } from './MarketGatewayContract';

export interface SettleOrderData {
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  quantity: BigNumberish;
  referralAddr: string;
  signature: BytesLike;
  order: Erc1155Order;
  account: string;
  chainId: ChainId;
  options?: ethers.Overrides;
}

export interface SwapSettleOrderData {
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  referralAddr: string;
  deadline: BigNumberish;
  path: string[];
  signature: BytesLike;
  order: Erc1155Order;
  quantity: BigNumberish;
  account: string;
  options?: ethers.Overrides;
}

export interface ValidateOrderData {
  hash: BytesLike;
  order: Erc1155Order;
  options?: ethers.Overrides;
}

export class Erc1155MarketGatewayContract extends MarketGatewayContract {
  public _orderExchangeInterface = 'ERC1155_EXCHANGE';
  encodeErc1155Order(erc1155Order: Erc1155Order): string {
    const erc1155OrderTypes = [
      '(address maker, uint8 kind, (uint8 erc,address addr,uint256 id,uint256 quantity) asset, uint256 expiredAt, address paymentToken, uint256 startedAt, uint256 unitPrice, uint256 endedAt, uint256 endedUnitPrice, uint256 expectedState, uint256 nonce)',
    ];
    return ethers.utils.defaultAbiCoder.encode(erc1155OrderTypes, [erc1155Order]);
  }

  encodeParamsForSettleErc1155Order(
    orderInfo: SettleParameterStruct,
    quantity: BigNumberish,
    settlePrice: BigNumberish,
  ) {
    return Erc1155OrderExchange__factory.createInterface().encodeFunctionData('settleOrder', [
      orderInfo,
      quantity,
      settlePrice,
    ]);
  }

  encodeParamsForSwapRonAndSettleErc1155Order(
    orderInfo: SettleParameterStruct,
    quantity: BigNumberish,
    deadline: BigNumberish,
    path: string[],
  ) {
    return Erc1155OrderExchange__factory.createInterface().encodeFunctionData('swapRONAndSettleOrder', [
      orderInfo,
      quantity,
      deadline,
      path,
    ]);
  }

  encodeParamsForSwapSettleErc1155Order(
    orderInfo: SettleParameterStruct,
    quantity: BigNumberish,
    settlePrice: BigNumberish,
    deadline: BigNumberish,
    path: string[],
  ) {
    return Erc1155OrderExchange__factory.createInterface().encodeFunctionData('swapTokensAndSettleOrder', [
      orderInfo,
      quantity,
      settlePrice,
      deadline,
      path,
    ]);
  }

  async cancelErc1155Order(order: Erc1155Order, options?: ethers.Overrides) {
    const encodedOrder = this.encodeErc1155Order(order);
    const encodeParams = Erc1155OrderExchange__factory.createInterface().encodeFunctionData('cancelOrder', [
      encodedOrder,
    ]);

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, { ...options });
  }

  async settleErc1155Order(data: SettleOrderData) {
    const { order, signature, referralAddr, expectedState, quantity, settlePrice, account, chainId, options } = data;
    const { paymentToken } = order;
    const tokens = getPaymentTokens(chainId);

    const isSettlingWithRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();

    const encodedOrder = this.encodeErc1155Order(order);
    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient: account,
      refunder: account,
    };
    const encodeParams = this.encodeParamsForSettleErc1155Order(orderInfo, quantity, settlePrice);

    if (isSettlingWithRon) {
      return this.functions.interactWith(this._orderExchangeInterface, encodeParams, {
        value: settlePrice,
        ...options,
      });
    }

    return this.functions.interactWith(this._orderExchangeInterface, encodeParams, { ...options });
  }

  async swapRONAndSettleErc1155Order(data: SwapSettleOrderData) {
    const { signature, referralAddr, expectedState, account, quantity, deadline, path, settlePrice, options } = data;
    const encodedOrder = this.encodeErc1155Order(data.order);
    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient: account,
      refunder: account,
    };
    const encodeParams = this.encodeParamsForSwapRonAndSettleErc1155Order(orderInfo, quantity, deadline, path);

    return await this.functions.interactWith(this._orderExchangeInterface, encodeParams, {
      value: settlePrice,
      ...options,
    });
  }

  async swapTokensAndSettleErc1155Order(data: SwapSettleOrderData) {
    const { signature, referralAddr, expectedState, order, quantity, settlePrice, deadline, path, account, options } =
      data;
    const encodedOrder = this.encodeErc1155Order(order);
    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient: account,
      refunder: account,
    };
    const encodeParams = this.encodeParamsForSwapSettleErc1155Order(orderInfo, quantity, settlePrice, deadline, path);

    return await this.functions.interactWith(this._orderExchangeInterface, encodeParams, { ...options });
  }
}
