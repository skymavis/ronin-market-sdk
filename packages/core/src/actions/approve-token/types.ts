import { ethers } from 'ethers';

import { ChainId, WalletClient } from '../../types';

export enum ApproveTokenType {
  Erc721 = 'Erc721',
  Erc1155 = 'Erc1155',
  Erc20 = 'Erc20',
  WRon = 'WRon',
}

export interface ApproveTokenParams {
  chainId: ChainId;
  wallet: WalletClient;
  address: string;
  tokenType: ApproveTokenType;
  options?: ethers.Overrides;
}

export type ApproveErc20TokenParams = Omit<ApproveTokenParams, 'tokenType'>;

export type ApproveErc721TokenParams = Omit<ApproveTokenParams, 'tokenType'>;

export type ApproveErc1155TokenParams = Omit<ApproveTokenParams, 'tokenType'>;

export interface ApproveWRonTokenParams {
  chainId: ChainId;
  wallet: WalletClient;
  options?: ethers.Overrides;
}
