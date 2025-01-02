import { BigNumber } from 'ethers';

import { Erc, ErcAssetItem, OrderStatus, OrderType } from '../../src';
import { account } from './profile';

export const erc721TokenAddress = '0x3fe52e39c3241ee5440a57edbb553563356b770c';

export const erc721TokenId = '548';

export const erc721OrderHash = 'd714d720bd7c19d3e0144c30b26c59eeb025943693e1e34afc26cfd6eb31d516';

export const offerData = {
  id: 2246,
  kind: 'Offer',
  expiredAt: 1706761587,
  paymentToken: '0xa959726154953bae111746e265e6d754f48570e6',
  startedAt: 1706675187,
  basePrice: '1000000000000000000',
  expectedState: '0',
  nonce: 0,
  marketFeePercentage: 425,
  hash: 'd714d720bd7c19d3e0144c30b26c59eeb025943693e1e34afc26cfd6eb31d516',
  duration: 0,
  timeLeft: 0,
  currentPrice: '1000000000000000000',
  suggestedPrice: '1000000000000000000',
  orderStatus: 'OPEN',
  orderQuantity: null,
};

export const erc721Order = {
  id: 2264,
  maker: '0x387c64f3e8e962a9e11b6d8fa4cf0b1640e61c95',
  kind: OrderType.Sell,
  assets: [
    {
      erc: Erc.Erc721,
      address: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
      id: '982',
      quantity: 0,
    },
  ],
  expiredAt: 1710840402,
  paymentToken: '0xa959726154953bae111746e265e6d754f48570e6',
  startedAt: 1708334802,
  basePrice: '1700000000000000000',
  expectedState: '0',
  nonce: 0,
  marketFeePercentage: 425,
  signature:
    '0x7b2ef0117ed8a9ae67ff555302e556aee574ca112d20bced0a6ef4a87cbbbf9465e862be108194f88abd96e2e2b8b4341f8a89af151e7c8b00654741b59a3ace1c',
  hash: 'fa01fbf2b7a5d13ce32b3747b1ed84fb36d057785fbf69b59fc595cde4af4435',
  duration: 0,
  timeLeft: 0,
  currentPrice: '1700000000000000000',
  suggestedPrice: '1700000000000000000',
  makerProfile: {
    accountId: '1eea0952-08c2-6d77-bbff-a8077114d108',
    addresses: {
      ethereum: null,
      ronin: 'ronin:387c64f3e8e962a9e11b6d8fa4cf0b1640e61c95',
    },
    activated: false,
    name: 'Lunacian #2',
  },
  orderStatus: OrderStatus.OPEN,
  orderQuantity: null,
};

export const createOrderData = {
  maker: account,
  order: {
    kind: OrderType.Sell,
    assets: [
      {
        erc: Erc.Erc721,
        address: erc721TokenAddress,
        id: erc721TokenId,
        quantity: '0',
      },
    ],
    expiredAt: 1708660303,
    paymentToken: '0xa959726154953bae111746e265e6d754f48570e6',
    startedAt: 1705981903,
    basePrice: '1000000000000000000',
    expectedState: '0',
    nonce: 0,
  },
  signature:
    '0x7e1791f6c8348782d6b9a6b7b2cb670fe9bf4bd167725ee98de812f66c8c93742328b44b413324451e9e367bc5b8d84cbea1b28f984da4bb745b63c571f039ca1b',
};

export const auctionData = {
  price: BigNumber.from('1700000000000000000'),
  duration: 1000,
  paymentToken: '0xa959726154953bae111746e265e6d754f48570e6',
  orderType: OrderType.Sell,
  expectedState: '0',
  nonce: 1,
  maker: '0x387c64f3e8e962a9e11b6d8fa4cf0b1640e61c95',
  assets: [
    {
      erc: ErcAssetItem.Erc721,
      addr: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
      id: '982',
      quantity: 0,
    },
  ],
};
