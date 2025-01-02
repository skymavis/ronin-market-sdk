import { BaseContract as EthersBaseContract, ethers } from 'ethers';

import { getConfig } from '../configs';
import { ChainId } from '../types';
import multiCallContractABI from './abis/multicall.json';

export class BaseContract extends EthersBaseContract {
  async sendMultiCallRequest(encodedFunctions: string[][], chainId: ChainId) {
    try {
      const multiCallInterface = new ethers.utils.Interface(multiCallContractABI);
      const data = multiCallInterface.encodeFunctionData('aggregate', [encodedFunctions]);
      const config = getConfig(chainId);
      const readProvider = new ethers.providers.StaticJsonRpcProvider(config.rpcEndpoint, chainId);
      const response = await readProvider.call({ to: config.contractsAddress.multiCall, data });

      return multiCallInterface.decodeFunctionResult('aggregate', response)._returnData;
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  }
}
