import { ethers } from 'ethers';

import { Order } from '../../queries';
import { ChainId, WalletClient } from '../../types';

export interface BuyTokenDataParams {
  chainId: ChainId;
  wallet: WalletClient;
  hash: string;
  selectedTokenAddress: string;
  quantity?: number;
  deadline: string;
  refAddress?: string;
  options?: ethers.Overrides;
}

export interface BuyErc721TokenParams extends Omit<BuyTokenDataParams, 'hash' | 'quantity'> {
  order: Order;
}

export interface BuyErc1155TokenParams extends Omit<BuyTokenDataParams, 'hash' | 'quantity'> {
  order: Order;
  quantity: number;
}

export interface GetSwapTokenDataParams {
  chainId: ChainId;
  inputTokenAddress: string;
  outputTokenAddress: string;
  amount: string;
}
