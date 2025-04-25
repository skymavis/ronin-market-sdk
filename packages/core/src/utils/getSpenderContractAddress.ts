import { isEmpty } from 'lodash';

import { getConfig, getSpenderContractConfig } from '../configs/index';
import { ChainId, SpenderContractType } from '../types/index';

export const getSpenderContractAddress = (chainId: ChainId, spenderContract?: SpenderContractType) => {
  const config = getConfig(chainId);
  const marketGatewayContractAddress = config.contractsAddress.marketGateway;
  if (isEmpty(spenderContract)) {
    return marketGatewayContractAddress;
  }

  const spenderAddressConfig = getSpenderContractConfig(chainId);
  const spenderAddress = spenderAddressConfig[spenderContract as SpenderContractType];
  return spenderAddress || marketGatewayContractAddress;
};
