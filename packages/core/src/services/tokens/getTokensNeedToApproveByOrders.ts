import { unionBy } from 'lodash';

import { BulkBuyOrderData, ChainId, WalletClient } from '../../types';
import { getOrdersTotalPrice } from '../order/getOrdersTotalPrice';
import { TokenData } from './data';
import { getPaymentToken } from './getPaymentTokens';
import { getTokensNeedToApprove } from './getTokensNeedToApprove';

export const getTokensNeedToApproveByOrders = async (
  chainId: ChainId,
  wallet: WalletClient,
  bulkBuyOrderData: BulkBuyOrderData[],
  inputPaymentToken: string,
): Promise<TokenData[]> => {
  const { account } = wallet;

  let allTokensNeedToApprove: TokenData[] = [];
  const checkedTokens: Record<string, boolean> = {};

  const paymentTokenData = getPaymentToken(chainId, inputPaymentToken);
  const { totalPrice } = await getOrdersTotalPrice({
    data: bulkBuyOrderData,
    token: paymentTokenData,
    chainId,
    wallet,
  });

  for (const data of bulkBuyOrderData) {
    const { order } = data;
    const { paymentToken } = order;

    if (!checkedTokens[paymentToken]) {
      checkedTokens[paymentToken] = true;

      const tokensNeedToApprove = await getTokensNeedToApprove(
        chainId,
        account,
        inputPaymentToken,
        paymentToken,
        totalPrice,
      );

      allTokensNeedToApprove = [...allTokensNeedToApprove, ...tokensNeedToApprove] as TokenData[];
    }
  }

  return unionBy(allTokensNeedToApprove, 'address');
};
