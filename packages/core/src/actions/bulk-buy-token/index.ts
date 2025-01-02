import { BigNumber } from 'ethers';

import { SWAP_DEFAULT_SLIPPAGE, ZERO_ADDRESS } from '../../common/constants';
import { Erc } from '../../queries';
import { Order } from '../../queries/order/types';
import { checkIsInsufficientBalance } from '../../services';
import { BulkSettleOrderData, bulkSettleOrders } from '../../services/order/bulkSettleOrders';
import { generateErc721Order, generateErc1155Order } from '../../services/order/generateOrderData';
import { getOrdersTotalPrice } from '../../services/order/getOrdersTotalPrice';
import { getSwapConfig } from '../../services/tokens';
import { TokenData } from '../../services/tokens/data';
import { getPaymentToken } from '../../services/tokens/getPaymentTokens';
import { ChainId } from '../../types';
import { BulkBuyTokenParams, ParseOrderParams } from './types';

export * from './types';

const parseOrder = (params: ParseOrderParams) => {
  const { tokenType, order, totalPrice, quantity, referralAddr = ZERO_ADDRESS } = params;
  const { expectedState, signature } = order;

  if (tokenType === Erc.Erc721) {
    const orderData = generateErc721Order(order);

    return {
      expectedState,
      settlePrice: totalPrice,
      referralAddr,
      signature,
      order: orderData,
    };
  }

  const orderData = generateErc1155Order(order);

  return {
    expectedState,
    settlePrice: totalPrice,
    referralAddr,
    signature,
    order: orderData,
    quantity: quantity.toString(),
  };
};

const swapAndParseOrder = (
  chainId: ChainId,
  order: Order,
  totalPrice: string,
  quantity: string,
  selectedToken: TokenData,
  deadline: string,
  tokenType: Erc,
) => {
  const { paymentToken: listingToken } = order;
  const { address } = selectedToken;
  const swapConfig = getSwapConfig(chainId, listingToken);
  const path = swapConfig[address].path;
  const settlePrice = BigNumber.from(totalPrice || '0')
    .mul(100 + SWAP_DEFAULT_SLIPPAGE)
    .div(100)
    .toString();
  const parsedOrder = parseOrder({ tokenType, order, totalPrice: settlePrice, quantity });

  return {
    ...parsedOrder,
    deadline,
    path,
  };
};

export const bulkBuyToken = async (params: BulkBuyTokenParams) => {
  try {
    const {
      chainId,
      wallet,
      data,
      selectedTokenAddress,
      deadline,
      tokenType,
      requiredAllSuccess = false,
      options,
    } = params;
    const selectedToken = getPaymentToken(chainId, selectedTokenAddress);
    const { address: paymentToken } = selectedToken as TokenData;
    const { account } = wallet;
    const { totalPriceOfEachOrder } = await getOrdersTotalPrice({
      data,
      chainId,
      token: selectedToken,
      wallet,
    });

    let totalSettlePrice = BigNumber.from('0');

    const bulkBuyData = data.map(({ quantity, order }) => {
      const { paymentToken: listingToken, hash } = order;
      const totalPrice = totalPriceOfEachOrder[hash];

      const isListingWithPaymentToken = listingToken.toLowerCase() === paymentToken.toLowerCase();
      if (isListingWithPaymentToken) {
        totalSettlePrice = totalSettlePrice.add(totalPrice);
        return parseOrder({ tokenType, order, totalPrice, quantity: quantity.toString() });
      }

      const settlePrice = BigNumber.from(totalPrice || '0')
        .mul(100 + SWAP_DEFAULT_SLIPPAGE)
        .div(100)
        .toString();
      totalSettlePrice = totalSettlePrice.add(settlePrice);
      return swapAndParseOrder(
        chainId,
        order,
        totalPrice,
        quantity.toString(),
        selectedToken as TokenData,
        deadline,
        tokenType,
      );
    });

    const isInsufficient = await checkIsInsufficientBalance(
      chainId,
      selectedTokenAddress,
      account,
      totalSettlePrice.toString(),
    );

    if (isInsufficient) {
      throw new Error('Insufficient balance for transaction.');
    }

    return bulkSettleOrders({
      chainId,
      wallet,
      bulkBuyData: bulkBuyData as BulkSettleOrderData[],
      paymentToken,
      totalSettlePrice: totalSettlePrice.toString(),
      tokenType,
      requiredAllSuccess,
      options,
    });
  } catch (error: any) {
    throw new Error(error.message || error);
  }
};
