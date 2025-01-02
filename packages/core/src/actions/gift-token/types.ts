import { ethers } from 'ethers';

import { ChainId, WalletClient } from '../../types';

export interface GiftTokenParams {
  chainId: ChainId;
  wallet: WalletClient;
  tokenId: string;
  tokenAddress: string;
  receiverAddress: string;
  quantity?: number;
  options?: ethers.Overrides;
}

export type GiftErc721TokenParams = Omit<GiftTokenParams, 'chainId' | 'quantity'>;

export interface GiftErc1155TokenParams extends Omit<GiftTokenParams, 'chainId' | 'quantity'> {
  quantity: number;
}
