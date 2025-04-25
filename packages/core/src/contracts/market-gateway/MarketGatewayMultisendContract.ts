import { BaseContract, BigNumberish, BytesLike, ethers } from 'ethers';

import { ZERO_ADDRESS } from '../../common/constants';
import { getConfig } from '../../configs';
import { Token } from '../../services/tokens/data';
import { getPaymentTokens } from '../../services/tokens/getPaymentTokens';
import { ChainId, Erc721Order, Erc1155Order, WalletClient } from '../../types';
import { InteractWithParamsStruct } from '../abis/types/v5/MarketGatewayMultisend';
import { SettleParameterStruct } from '../abis/types/v5/MavisExchange';
import {
  createErc1155MarketGatewayContract,
  Erc1155MarketGatewayContract,
  SettleOrderData,
} from './Erc1155MarketGatewayContract';
import { createMarketGatewayContract, MarketGatewayContract, SettleOrderContractParams } from './MarketGatewayContract';

export interface BulkSettleErc721OrderData {
  chainId: ChainId;
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  referralAddr: string;
  signature: BytesLike;
  order: Erc721Order;
  deadline?: BigNumberish;
  path?: string[];
}

export interface BulkSettleErc1155OrderData {
  chainId: ChainId;
  expectedState: BigNumberish;
  settlePrice: BigNumberish;
  referralAddr: string;
  signature: BytesLike;
  order: Erc1155Order;
  quantity: BigNumberish;
  deadline?: BigNumberish;
  path?: string[];
}

export interface EstimateGasBulkSettleOrderParams {
  chainId: ChainId;
  wallet: WalletClient;
  ordersData: BulkSettleErc721OrderData[] | BulkSettleErc1155OrderData[];
  paymentToken: string;
  totalSettlePrice: BigNumberish;
}

export class MarketGatewayMultisendContract extends BaseContract {
  public _erc721MarketGatewayContract!: MarketGatewayContract;
  public _erc1155MarketGatewayContract!: Erc1155MarketGatewayContract;

  encodeErc721Params(
    chainId: ChainId,
    wallet: WalletClient,
    orderData: BulkSettleErc721OrderData,
    paymentToken: string,
  ) {
    const { order, signature, referralAddr, expectedState, settlePrice, deadline, path } = orderData;
    const { provider, account } = wallet;
    const { paymentToken: listingToken } = order;

    this._erc721MarketGatewayContract = createMarketGatewayContract(chainId, provider);
    const encodedOrder = this._erc721MarketGatewayContract.encodeOrder(order);

    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient: account,
      refunder: account,
    };

    const tokens = getPaymentTokens(chainId);
    const isPaidByRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();
    const shouldSwapToken = listingToken.toLowerCase() !== paymentToken.toLowerCase();
    const isSwappedSettledByRon = isPaidByRon && shouldSwapToken;

    if (!shouldSwapToken) {
      return this._erc721MarketGatewayContract.encodeParamsForSettleErc721Order(orderInfo, settlePrice);
    }

    if (isSwappedSettledByRon) {
      return this._erc721MarketGatewayContract.encodeParamsForSwapRonAndSettleErc721Order(
        orderInfo,
        deadline as string,
        path as string[],
      );
    }

    return this._erc721MarketGatewayContract.encodeParamsForSwapSettleErc721Order(
      orderInfo,
      settlePrice,
      deadline as string,
      path as string[],
    );
  }

  encodeErc1155Params(
    chainId: ChainId,
    wallet: WalletClient,
    orderData: BulkSettleErc1155OrderData,
    paymentToken: string,
  ) {
    const { order, signature, referralAddr, expectedState, settlePrice, quantity, deadline, path } = orderData;
    const { provider, account } = wallet;
    const { paymentToken: listingToken } = order;

    this._erc1155MarketGatewayContract = createErc1155MarketGatewayContract(chainId, provider);
    const encodedOrder = this._erc1155MarketGatewayContract.encodeErc1155Order(order);

    const orderInfo: SettleParameterStruct = {
      orderData: encodedOrder,
      signature: signature,
      referralAddr: referralAddr,
      expectedState: expectedState,
      recipient: account,
      refunder: account,
    };

    const tokens = getPaymentTokens(chainId);
    const isPaidByRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();
    const shouldSwapToken = listingToken.toLowerCase() !== paymentToken.toLowerCase();
    const isSwappedSettledByRon = isPaidByRon && shouldSwapToken;

    if (!shouldSwapToken) {
      return this._erc1155MarketGatewayContract.encodeParamsForSettleErc1155Order(orderInfo, quantity, settlePrice);
    }

    if (isSwappedSettledByRon) {
      return this._erc1155MarketGatewayContract.encodeParamsForSwapRonAndSettleErc1155Order(
        orderInfo,
        quantity,
        deadline as string,
        path as string[],
      );
    }

    return this._erc1155MarketGatewayContract.encodeParamsForSwapSettleErc1155Order(
      orderInfo,
      quantity,
      settlePrice,
      deadline as string,
      path as string[],
    );
  }

  getErc721OrderParams(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: BulkSettleErc721OrderData[],
    paymentToken: string,
  ) {
    const tokens = getPaymentTokens(chainId);
    const isRonToken = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();

    const orderParams = ordersData.map(orderData => {
      const { settlePrice } = orderData;
      const encodeParams = this.encodeErc721Params(
        chainId,
        wallet,
        orderData as BulkSettleErc721OrderData,
        paymentToken,
      );
      return {
        interfaceName: this._erc721MarketGatewayContract._orderExchangeInterface,
        data: encodeParams,
        paymentToken: isRonToken ? ZERO_ADDRESS : paymentToken,
        value: settlePrice,
      };
    });

    return orderParams;
  }

  getErc1155OrderParams(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: BulkSettleErc1155OrderData[],
    paymentToken: string,
  ) {
    const tokens = getPaymentTokens(chainId);
    const isRonToken = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();

    const orderParams = ordersData.map(orderData => {
      const { settlePrice } = orderData;
      const encodeParams = this.encodeErc1155Params(
        chainId,
        wallet,
        orderData as BulkSettleErc1155OrderData,
        paymentToken,
      );

      return {
        interfaceName: this._erc1155MarketGatewayContract._orderExchangeInterface,
        data: encodeParams,
        paymentToken: isRonToken ? ZERO_ADDRESS : paymentToken,
        value: settlePrice,
      };
    });

    return orderParams;
  }

  async estimateGasBulkSettleOrders(
    chainId: ChainId,
    orderParams: InteractWithParamsStruct[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
  ) {
    try {
      const tokens = getPaymentTokens(chainId);
      const isSettlingWithRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();
      const config = getConfig(chainId);
      const contractAddress = config.contractsAddress.marketGateway;

      if (isSettlingWithRon) {
        return await this.estimateGas.bulkInteractWith(contractAddress, orderParams, requiredAllSuccess, {
          value: totalSettlePrice,
        });
      }

      return await this.estimateGas.bulkInteractWith(contractAddress, orderParams, requiredAllSuccess);
    } catch (error: any) {
      throw new Error(error?.message || error);
    }
  }

  async estimateGasBulkSettleErc721Orders(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: SettleOrderContractParams[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
  ) {
    const orderParams = this.getErc721OrderParams(chainId, wallet, ordersData, paymentToken);
    return this.estimateGasBulkSettleOrders(chainId, orderParams, paymentToken, totalSettlePrice, requiredAllSuccess);
  }

  async estimateGasBulkSettleErc1155Orders(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: SettleOrderData[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
  ) {
    const orderParams = this.getErc1155OrderParams(chainId, wallet, ordersData, paymentToken);
    return this.estimateGasBulkSettleOrders(chainId, orderParams, paymentToken, totalSettlePrice, requiredAllSuccess);
  }

  async bulkSettleOrders(
    chainId: ChainId,
    orderParams: InteractWithParamsStruct[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
    options?: ethers.Overrides,
  ) {
    try {
      const tokens = getPaymentTokens(chainId);
      const isSettlingWithRon = paymentToken.toLowerCase() === tokens[Token.RON].address.toLowerCase();
      const config = getConfig(chainId);
      const contractAddress = config.contractsAddress.marketGateway;

      let gasLimit = options?.gasLimit;
      if (!gasLimit) {
        gasLimit = await this.estimateGasBulkSettleOrders(
          chainId,
          orderParams,
          paymentToken,
          totalSettlePrice,
          requiredAllSuccess,
        );
        gasLimit = gasLimit.add(gasLimit.div(2));
      }

      if (isSettlingWithRon) {
        return this.functions.bulkInteractWith(contractAddress, orderParams, requiredAllSuccess, {
          gasLimit,
          ...options,
          value: totalSettlePrice,
        });
      }

      return this.functions.bulkInteractWith(contractAddress, orderParams, requiredAllSuccess, {
        gasLimit,
        ...options,
      });
    } catch (error: any) {
      throw new Error(error?.message || error);
    }
  }

  async bulkSettleErc721Orders(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: SettleOrderContractParams[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
    options?: ethers.Overrides,
  ) {
    const orderParams = this.getErc721OrderParams(chainId, wallet, ordersData, paymentToken);
    return this.bulkSettleOrders(chainId, orderParams, paymentToken, totalSettlePrice, requiredAllSuccess, options);
  }

  async bulkSettleErc1155Orders(
    chainId: ChainId,
    wallet: WalletClient,
    ordersData: SettleOrderData[],
    paymentToken: string,
    totalSettlePrice: BigNumberish,
    requiredAllSuccess: boolean = false,
    options?: ethers.Overrides,
  ) {
    const orderParams = this.getErc1155OrderParams(chainId, wallet, ordersData, paymentToken);
    return this.bulkSettleOrders(chainId, orderParams, paymentToken, totalSettlePrice, requiredAllSuccess, options);
  }
}
