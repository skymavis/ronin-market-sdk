import { ethers } from 'ethers';

import { ChainId, WalletClient } from '../../types';

export interface WrapRonParams {
  chainId: ChainId;
  wallet: WalletClient;
  amount: string;
  options?: ethers.Overrides;
}
