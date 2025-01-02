export const MARKET_FEE_PERCENTAGE = 425;
export const SWAP_DEFAULT_SLIPPAGE = 1; // 1%
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const Erc1155OrderAbiTypes = {
  Asset: [
    {
      name: 'erc',
      type: 'uint8',
    },
    {
      name: 'addr',
      type: 'address',
    },
    {
      name: 'id',
      type: 'uint256',
    },
    {
      name: 'quantity',
      type: 'uint256',
    },
  ],
  ERC1155Order: [
    {
      name: 'maker',
      type: 'address',
    },
    {
      name: 'kind',
      type: 'uint8',
    },
    {
      name: 'asset',
      type: 'Asset',
    },
    {
      name: 'expiredAt',
      type: 'uint256',
    },
    {
      name: 'paymentToken',
      type: 'address',
    },
    {
      name: 'startedAt',
      type: 'uint256',
    },
    {
      name: 'unitPrice',
      type: 'uint256',
    },
    {
      name: 'endedAt',
      type: 'uint256',
    },
    {
      name: 'endedUnitPrice',
      type: 'uint256',
    },
    {
      name: 'expectedState',
      type: 'uint256',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
  ],
};

export const OrderAbiTypes = {
  Asset: [
    {
      name: 'erc',
      type: 'uint8',
    },
    {
      name: 'addr',
      type: 'address',
    },
    {
      name: 'id',
      type: 'uint256',
    },
    {
      name: 'quantity',
      type: 'uint256',
    },
  ],
  Order: [
    {
      name: 'maker',
      type: 'address',
    },
    {
      name: 'kind',
      type: 'uint8',
    },
    {
      name: 'assets',
      type: 'Asset[]',
    },
    {
      name: 'expiredAt',
      type: 'uint256',
    },
    {
      name: 'paymentToken',
      type: 'address',
    },
    {
      name: 'startedAt',
      type: 'uint256',
    },
    {
      name: 'basePrice',
      type: 'uint256',
    },
    {
      name: 'endedAt',
      type: 'uint256',
    },
    {
      name: 'endedPrice',
      type: 'uint256',
    },
    {
      name: 'expectedState',
      type: 'uint256',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'marketFeePercentage',
      type: 'uint256',
    },
  ],
};
