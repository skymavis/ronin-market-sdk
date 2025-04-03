import { createMarketGatewayContract, createReadOnlyProvider, MavisExchange__factory } from '../../contracts';
import { ChainId } from '../../types';

export const getNonce = async (chainId: ChainId, address: string) => {
  const marketGatewayContract = createMarketGatewayContract(chainId);
  const readProvider = createReadOnlyProvider(chainId);

  const params = MavisExchange__factory.createInterface().encodeFunctionData('makerNonce', [address]);

  const encodedResponse = await readProvider.call({
    to: marketGatewayContract.address,
    data: marketGatewayContract.interface.encodeFunctionData('interactWith', [
      marketGatewayContract._orderExchangeInterface,
      params,
    ]),
  });

  const result = MavisExchange__factory.createInterface().decodeFunctionResult('makerNonce', encodedResponse);

  return result?.[0]?.toNumber();
};
