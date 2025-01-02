import { ethers } from 'ethers';

import { Order } from '../../queries';
import { ChainId, WalletClient } from '../../types';

export interface CancelOrderParams {
  chainId: ChainId;
  wallet: WalletClient;
  hash: string;
  options?: ethers.Overrides;
}

export interface CancelErc721OrderParams extends Omit<CancelOrderParams, 'hash'> {
  order: Order;
}

export interface CancelErc1155OrderParams extends Omit<CancelOrderParams, 'hash'> {
  order: Order;
}

export interface CreateOrderParams {
  chainId: ChainId;
  wallet: WalletClient;
  tokenAddress: string;
  tokenId: string;
  paymentToken: string;
  price: string;
  duration: number;
  quantity?: number;
}

export type CreateErc721OrderParams = Omit<CreateOrderParams, 'quantity'>;

export interface CreateErc1155OrderParams extends Omit<CreateOrderParams, 'quantity'> {
  quantity: number;
}
