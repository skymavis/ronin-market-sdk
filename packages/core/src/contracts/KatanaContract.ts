import { ChainId } from '../types';
import { BaseContract } from './BaseContract';

export class KatanaContract extends BaseContract {
  async getAmountsInMultiCall(data: { amount: string; path: string[] }[], chainId: ChainId) {
    try {
      const encodedRequests = data.reduce((returnedData, currentValue) => {
        const { amount, path } = currentValue;
        const encodedData = this.interface.encodeFunctionData('getAmountsIn', [amount, path]);
        return [...returnedData, [this.address, encodedData]];
      }, [] as string[][]);

      const results = await this.sendMultiCallRequest(encodedRequests, chainId);
      return data.map((_, index) => {
        const decodedData = this.interface.decodeFunctionResult('getAmountsIn', results[index]);
        return decodedData[0][0];
      });
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  }
}
