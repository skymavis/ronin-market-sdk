import { ethers } from 'ethers';

import { ChainId, WalletClient } from '../../types';
import { CancelOrderParams } from '../order';

export interface MakeOfferParams {
  chainId: ChainId;
  wallet: WalletClient;
  tokenId: string;
  tokenAddress: string;
  price: string;
  duration: number;
}

export type CancelOfferParams = CancelOrderParams;

export interface AcceptOfferParams {
  chainId: ChainId;
  wallet: WalletClient;
  hash: string;
  refAddress?: string;
  options?: ethers.Overrides;
}
