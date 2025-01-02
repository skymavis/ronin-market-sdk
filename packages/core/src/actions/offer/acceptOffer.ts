import { ZERO_ADDRESS } from '../../common';
import { getOffer } from '../../queries';
import { checkIsErc721Approved, settleErc721Order } from '../../services';
import { AcceptOfferParams } from './types';

export const acceptOffer = async (params: AcceptOfferParams) => {
  const { hash, wallet, chainId, refAddress = ZERO_ADDRESS, options } = params;
  const { account } = wallet;

  const offer = await getOffer({ hash, chainId });
  if (!offer) {
    throw new Error('Offer not found');
  }

  const { assets } = offer;
  const tokenAddress = assets?.[0]?.token?.tokenAddress as string;

  const isApproved = await checkIsErc721Approved(chainId, account, tokenAddress);
  if (!isApproved) {
    throw new Error('Token need to be approved');
  }

  return settleErc721Order(chainId, wallet, offer, '0', refAddress, options);
};
