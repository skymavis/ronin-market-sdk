import { Erc, OrderStatus, OrderType } from '../../src';

export const erc1155TokenAddress = '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09';

export const erc1155TokenId = '8';

export const erc1155Order = {
  id: 2237,
  maker: '0x387c64f3e8e962a9e11b6d8fa4cf0b1640e61c95',
  kind: OrderType.Sell,
  assets: [
    {
      erc: Erc.Erc1155,
      address: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
      id: '8',
      quantity: 25,
    },
  ],
  expiredAt: 1708765296,
  paymentToken: '0xa959726154953bae111746e265e6d754f48570e6',
  startedAt: 1706086896,
  basePrice: '2000000000000000000',
  expectedState: '0',
  nonce: 0,
  marketFeePercentage: 425,
  signature:
    '0x7e1791f6c8348782d6b9a6b7b2cb670fe9bf4bd167725ee98de812f66c8c93742328b44b413324451e9e367bc5b8d84cbea1b28f984da4bb745b63c571f039ca1b',
  hash: '8bb900886414f12106e6c0a603a15b0b83a185ed35e89f5c09475b6ffbbbd205',
  duration: 0,
  timeLeft: 0,
  currentPrice: '2000000000000000000',
  suggestedPrice: '2000000000000000000',
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
  orderQuantity: {
    orderId: 2237,
    quantity: '25',
    remainingQuantity: '24',
    availableQuantity: '1',
  },
};
