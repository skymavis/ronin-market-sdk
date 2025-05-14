import { createMarketGatewayContract, createReadOnlyProvider } from '../../contracts';
import { ChainId } from '../../types';

export const getNonce = async (chainId: ChainId, address: string) => {
  const readProvider = createReadOnlyProvider(chainId);
  const marketGatewayContract = createMarketGatewayContract(chainId);

  const nonce = await marketGatewayContract.connect(readProvider).makerNonce(address);
  return Number(nonce);
};
