import { Erc1155OrderAbiTypes, OrderAbiTypes } from '../../common/constants';
import { getConfig } from '../../configs';
import { ChainId, Erc721Order, Erc1155Order, Signer } from '../../types';

export const getErc721OrderSignature = (chainId: ChainId, signer: Signer, order: Erc721Order) => {
  const config = getConfig(chainId);
  const { marketGatewayDomain } = config;
  return signer._signTypedData(marketGatewayDomain, OrderAbiTypes, order);
};

export const getErc1155OrderSignature = (chainId: ChainId, signer: Signer, order: Erc1155Order) => {
  const config = getConfig(chainId);
  const { marketGatewayDomain } = config;
  return signer._signTypedData(marketGatewayDomain, Erc1155OrderAbiTypes, order);
};
