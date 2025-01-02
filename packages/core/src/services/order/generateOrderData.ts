import { InputOrder, Order } from '../../queries';
import { AuctionData, Erc721Order, Erc1155Order } from '../../types';
import { getErcAssetItem, getErcType, getOrderKind } from '../../utils';

export const generateErc721Order = (order: Order) => {
  const {
    expiredAt,
    basePrice,
    kind,
    startedAt,
    assets,
    paymentToken,
    maker,
    expectedState,
    nonce,
    marketFeePercentage,
  } = order;

  const result: Erc721Order = {
    maker: maker,
    kind: getOrderKind(kind),
    assets: assets.map(asset => {
      const { address, erc, quantity, id } = asset;
      return {
        addr: address,
        erc: getErcAssetItem(erc),
        quantity: Number(quantity),
        id: id,
      };
    }),
    expiredAt: expiredAt,
    basePrice: basePrice,
    paymentToken: paymentToken,
    startedAt: startedAt,
    endedAt: 0,
    endedPrice: '0',
    expectedState: `${expectedState}`,
    nonce: nonce,
    marketFeePercentage: marketFeePercentage,
  };

  return result;
};

export const generateErc1155Order = (order: Order) => {
  const { expiredAt, basePrice, kind, startedAt, assets, paymentToken, maker, expectedState, nonce } = order;

  const parsedAssets = assets.map(asset => {
    return {
      erc: getErcAssetItem(asset.erc),
      addr: asset.address,
      id: asset.id,
      quantity: asset.quantity,
    };
  });
  const result: Erc1155Order = {
    maker: maker,
    kind: getOrderKind(kind),
    asset: parsedAssets[0],
    expiredAt: expiredAt,
    unitPrice: basePrice,
    paymentToken: paymentToken,
    startedAt: startedAt,
    endedAt: 0,
    endedUnitPrice: '0',
    expectedState: `${expectedState}`,
    nonce: nonce,
  };

  return result;
};

export const generateInputOrder = (data: AuctionData) => {
  const { price, duration, orderType, expectedState, nonce, assets, paymentToken } = data;

  const now = new Date().getTime();
  const startedAt = Math.ceil(now / 1000);
  const expiredAt = startedAt + duration;

  const inputOrder: InputOrder = {
    nonce,
    assets: assets.map(asset => {
      const { addr, erc, quantity, id } = asset;
      return {
        erc: getErcType(erc),
        address: addr,
        id: id,
        quantity: quantity.toString(),
      };
    }),
    startedAt,
    expiredAt,
    expectedState,
    paymentToken,
    kind: orderType,
    basePrice: price.toString(),
  };

  return inputOrder;
};
