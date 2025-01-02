import { BigNumberish, ethers } from 'ethers';

import {
  BulkSettleErc721OrderData,
  BulkSettleErc1155OrderData,
  createMarketGatewayMultiSendContract,
} from '../../contracts';
import { SettleOrderData } from '../../contracts/market-gateway/Erc1155MarketGatewayContract';
import { SettleOrderContractParams } from '../../contracts/market-gateway/MarketGatewayContract';
import { Erc } from '../../queries/collection/types';
import { ChainId, WalletClient } from '../../types';

export type BulkSettleOrderData = BulkSettleErc1155OrderData | BulkSettleErc721OrderData;

export interface BulkSettleOrderParams {
  chainId: ChainId;
  wallet: WalletClient;
  bulkBuyData: BulkSettleOrderData[];
  paymentToken: string;
  totalSettlePrice: string;
  tokenType: Erc;
  requiredAllSuccess: boolean;
  options?: ethers.Overrides;
}

export const bulkSettleOrders = (params: BulkSettleOrderParams) => {
  const {
    chainId,
    wallet,
    bulkBuyData,
    paymentToken,
    totalSettlePrice,
    tokenType,
    requiredAllSuccess = false,
    options,
  } = params;

  if (tokenType === Erc.Erc721) {
    return bulkSettleErc721Orders(
      chainId,
      wallet,
      bulkBuyData as SettleOrderContractParams[],
      paymentToken,
      totalSettlePrice,
      requiredAllSuccess,
      options,
    );
  }

  return bulkSettleErc1155Orders(
    chainId,
    wallet,
    bulkBuyData as SettleOrderData[],
    paymentToken,
    totalSettlePrice,
    requiredAllSuccess,
    options,
  );
};

export const bulkSettleErc721Orders = (
  chainId: ChainId,
  wallet: WalletClient,
  ordersData: SettleOrderContractParams[],
  paymentToken: string,
  totalSettlePrice: BigNumberish,
  requiredAllSuccess: boolean,
  options?: ethers.Overrides,
) => {
  const { provider } = wallet;

  const marketGatewayMultisendContract = createMarketGatewayMultiSendContract(chainId, provider);

  return marketGatewayMultisendContract.bulkSettleErc721Orders(
    chainId,
    wallet,
    ordersData,
    paymentToken,
    totalSettlePrice,
    requiredAllSuccess,
    options,
  );
};

export const bulkSettleErc1155Orders = (
  chainId: ChainId,
  wallet: WalletClient,
  ordersData: SettleOrderData[],
  paymentToken: string,
  totalSettlePrice: BigNumberish,
  requiredAllSuccess: boolean,
  options?: ethers.Overrides,
) => {
  const { provider } = wallet;

  const marketGatewayMultisendContract = createMarketGatewayMultiSendContract(chainId, provider);

  return marketGatewayMultisendContract.bulkSettleErc1155Orders(
    chainId,
    wallet,
    ordersData,
    paymentToken,
    totalSettlePrice,
    requiredAllSuccess,
    options,
  );
};
