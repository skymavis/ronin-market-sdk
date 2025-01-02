import { ethers } from 'ethers';

import { Erc } from '../../queries';
import { Order } from '../../queries/order/types';
import { BulkBuyOrderData, ChainId, WalletClient } from '../../types';

export interface ParseOrderParams {
  tokenType: Erc;
  order: Order;
  totalPrice: string;
  quantity: string;
  referralAddr?: string;
}

export interface TotalPriceOfEachOrder {
  [orderHash: string]: string;
}

export interface BulkBuyTokenParams {
  chainId: ChainId;
  wallet: WalletClient;
  data: BulkBuyOrderData[];
  selectedTokenAddress: string;
  deadline: string;
  tokenType: Erc;
  requiredAllSuccess: boolean;
  options?: ethers.Overrides;
}
