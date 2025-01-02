import { Erc, ExchangeRate, OrderType } from '../queries';
import { ErcAssetItem, OrderKind } from '../types';

export const getOrderKind = (orderType: OrderType) => {
  switch (orderType) {
    case OrderType.Offer:
      return OrderKind.Offer;
    default:
      return OrderKind.Sell;
  }
};

export const getErcAssetItem = (ercType: Erc) => {
  switch (ercType) {
    case Erc.Erc20:
      return ErcAssetItem.Erc20;
    case Erc.Erc1155:
      return ErcAssetItem.Erc1155;
    case Erc.Erc721:
      return ErcAssetItem.Erc721;
  }
};

export const getErcType = (ercAssetItem: ErcAssetItem) => {
  switch (ercAssetItem) {
    case ErcAssetItem.Erc20:
      return Erc.Erc20;
    case ErcAssetItem.Erc1155:
      return Erc.Erc1155;
    case ErcAssetItem.Erc721:
      return Erc.Erc721;
  }
};

export const getRate = (tokenSymbol: string, exchangeRate: ExchangeRate) => {
  switch (tokenSymbol.toUpperCase()) {
    case 'WRON':
    case 'RON':
      return exchangeRate.ron.usd;
    case 'AXS':
      return exchangeRate.axs.usd;
    case 'SLP':
      return exchangeRate.slp.usd;
    case 'USDC':
      return exchangeRate.usd.usd;
    default:
      return exchangeRate.eth.usd;
  }
};
