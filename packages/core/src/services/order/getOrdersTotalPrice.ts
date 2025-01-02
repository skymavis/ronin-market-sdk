import { BigNumber } from 'ethers';
import { isEmpty } from 'lodash';

import { TotalPriceOfEachOrder } from '../../actions/bulk-buy-token/types';
import { createKatanaContract } from '../../contracts';
import { BulkBuyOrderData, ChainId } from '../../types';
import { WalletClient } from '../../types/wallet';
import { getSwapConfig } from '../tokens/configs';
import { paymentTokens, TokenData } from '../tokens/data';

export interface GetOrdersTotalPriceParams {
  data: BulkBuyOrderData[];
  chainId: ChainId;
  wallet: WalletClient;
  token?: TokenData;
}

export const getOrdersTotalPrice = async (params: GetOrdersTotalPriceParams) => {
  const { data, chainId, wallet, token } = params;
  const { provider } = wallet;
  const { address } = token || paymentTokens?.[chainId].RON;
  const katanaContract = createKatanaContract(chainId, provider);

  const ordersNeedToSwap = data.filter(orderData => orderData.order.paymentToken !== address);
  const ordersDontNeedToSwap = data.filter(orderData => orderData.order.paymentToken === address);
  const totalPriceOfEachOrder: TotalPriceOfEachOrder = {};

  let totalPrice = ordersDontNeedToSwap.reduce((total, { quantity, order }) => {
    const { currentPrice, hash } = order;
    const orderTotalPrice = BigNumber.from(currentPrice).mul(quantity);
    totalPriceOfEachOrder[hash] = orderTotalPrice.toString();

    return total.add(orderTotalPrice);
  }, BigNumber.from(0));

  const ordersNeedToSwapAmounts = ordersNeedToSwap.map(({ quantity, order }) => {
    const { paymentToken, currentPrice } = order;
    const swapConfig = getSwapConfig(chainId, paymentToken);
    const path = swapConfig[address].path;
    const orderTotalPrice = BigNumber.from(currentPrice).mul(quantity);
    return { amount: orderTotalPrice.toString(), path };
  });

  if (!isEmpty(ordersNeedToSwap)) {
    const swappedValues = await katanaContract.getAmountsInMultiCall(ordersNeedToSwapAmounts, chainId);
    const totalSwappedValues = ordersNeedToSwap.reduce((total, { order }, currentIndex) => {
      const { hash } = order;
      const price = swappedValues[currentIndex];
      totalPriceOfEachOrder[hash] = price.toString();
      return total.add(price);
    }, BigNumber.from(0));
    totalPrice = totalPrice.add(totalSwappedValues);
  }

  return {
    totalPrice: totalPrice.toString(),
    totalPriceOfEachOrder,
  };
};
