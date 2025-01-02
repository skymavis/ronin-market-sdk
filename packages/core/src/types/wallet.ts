import { JsonRpcSigner } from '@ethersproject/providers';
import { ethers, Signer as EtherSigner, VoidSigner } from 'ethers';

export type Signer = ethers.Wallet | JsonRpcSigner | VoidSigner;
export type WalletProvider = EtherSigner | ethers.providers.Provider;

export interface WalletClient {
  provider: WalletProvider;
  signer: Signer;
  account: string;
}
