import { BigNumber } from 'ethers';

import { createErc721Contract, createErc1155Contract } from '../../contracts';
import { Erc, getTokenMetadata } from '../../queries';
import { GiftErc721TokenParams, GiftErc1155TokenParams, GiftTokenParams } from './types';

export * from './types';

export const giftErc721Token = async (params: GiftErc721TokenParams) => {
  const { tokenId, tokenAddress, receiverAddress, wallet, options } = params;
  const { account, provider } = wallet;
  const erc721Contract = createErc721Contract(tokenAddress, provider);
  return erc721Contract?.['safeTransferFrom(address,address,uint256)'](
    account,
    receiverAddress,
    BigNumber.from(tokenId),
    { ...options },
  );
};

export const giftErc1155Token = async (params: GiftErc1155TokenParams) => {
  const { tokenId, tokenAddress, receiverAddress, quantity, wallet, options } = params;
  const { account, provider } = wallet;
  const erc1155Contract = createErc1155Contract(tokenAddress, provider);
  return erc1155Contract?.safeTransferFrom(account, receiverAddress, BigNumber.from(tokenId), quantity, [], {
    ...options,
  });
};

export const giftToken = async (params: GiftTokenParams) => {
  const { chainId, ...otherParams } = params;

  const tokenMetadata = await getTokenMetadata({
    showAttributes: false,
    chainId,
    tokenAddress: otherParams.tokenAddress,
  });
  const { erc } = tokenMetadata;

  if (erc === Erc.Erc721) {
    return giftErc721Token(otherParams);
  }
  return giftErc1155Token({ quantity: 1, ...otherParams });
};
