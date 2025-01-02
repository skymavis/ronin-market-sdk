import { cancelOrder } from '../order';
import { CancelOfferParams } from './types';

export const cancelOffer = (params: CancelOfferParams) => {
  return cancelOrder(params);
};
