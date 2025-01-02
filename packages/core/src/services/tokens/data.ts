import { ChainId } from '../../types';

export enum Token {
  RON = 'RON',
  WETH = 'WETH',
  AXS = 'AXS',
  SLP = 'SLP',
  USDC = 'USDC',
}

export interface TokenData {
  chainId: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  unit: string;
  imageUrl: string;
}

export type Tokens = { [key in ChainId]: { [key in Token]: TokenData } };

export const paymentTokens: Tokens = {
  [ChainId.testnet]: {
    [Token.RON]: {
      chainId: 2021,
      address: '0xa959726154953bae111746e265e6d754f48570e6',
      decimals: 18,
      symbol: 'RON',
      name: 'Ronin',
      unit: 'ether',
      imageUrl: 'https://cdn.skymavis.com/ronin/2021/ron/logo-transparent.png',
    },
    [Token.WETH]: {
      chainId: 2021,
      address: '0x29c6f8349a028e1bdfc68bfa08bdee7bc5d47e16',
      decimals: 18,
      symbol: 'WETH',
      name: 'Ronin Wrapped Ethereum',
      unit: 'ether',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2021/erc20/0x29c6f8349a028e1bdfc68bfa08bdee7bc5d47e16/logo-transparent.png',
    },
    [Token.AXS]: {
      chainId: 2021,
      address: '0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d',
      decimals: 18,
      symbol: 'AXS',
      name: 'Axie Infinity Shard',
      unit: 'ether',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2021/erc20/0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d/logo-transparent.png',
    },
    [Token.SLP]: {
      chainId: 2021,
      address: '0x82f5483623d636bc3deba8ae67e1751b6cf2bad2',
      decimals: 0,
      symbol: 'SLP',
      name: 'Smooth Love Potion',
      unit: 'wei',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2021/erc20/0x82f5483623d636bc3deba8ae67e1751b6cf2bad2/logo-transparent.png',
    },
    [Token.USDC]: {
      chainId: 2021,
      address: '0x067fbff8990c58ab90bae3c97241c5d736053f77',
      decimals: 6,
      symbol: 'USDC',
      name: 'USDC',
      unit: 'mwei',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2021/erc20/0x067fbff8990c58ab90bae3c97241c5d736053f77/logo-transparent.png',
    },
  },
  [ChainId.mainnet]: {
    [Token.RON]: {
      chainId: 2020,
      address: '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4',
      decimals: 18,
      symbol: 'RON',
      name: 'Ronin',
      unit: 'ether',
      imageUrl: 'https://cdn.skymavis.com/ronin/2020/ron/logo-transparent.png',
    },
    [Token.WETH]: {
      chainId: 2020,
      address: '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
      decimals: 18,
      symbol: 'WETH',
      name: 'Ronin Wrapped Ethereum',
      unit: 'ether',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2020/erc20/0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5/logo-transparent.png',
    },
    [Token.AXS]: {
      chainId: 2020,
      address: '0x97a9107c1793bc407d6f527b77e7fff4d812bece',
      decimals: 18,
      symbol: 'AXS',
      name: 'Axie Infinity Shard',
      unit: 'ether',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2020/erc20/0x97a9107c1793bc407d6f527b77e7fff4d812bece/logo-transparent.png',
    },
    [Token.SLP]: {
      chainId: 2020,
      address: '0xa8754b9fa15fc18bb59458815510e40a12cd2014',
      decimals: 0,
      symbol: 'SLP',
      name: 'Smooth Love Potion',
      unit: 'wei',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2020/erc20/0xa8754b9fa15fc18bb59458815510e40a12cd2014/logo-transparent.png',
    },
    [Token.USDC]: {
      chainId: 2020,
      address: '0x0b7007c13325c48911f73a2dad5fa5dcbf808adc',
      decimals: 6,
      symbol: 'USDC',
      name: 'USD//C',
      unit: 'mwei',
      imageUrl:
        'https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo-transparent.png',
    },
  },
};

export const wRonToken = {
  [ChainId.testnet]: {
    chainId: 2021,
    address: '0xa959726154953bae111746e265e6d754f48570e6',
    decimals: 18,
    symbol: 'WRON',
    name: 'Wrapped Ronin',
    unit: 'ether',
    imageUrl:
      'https://cdn.skymavis.com/ronin/2021/erc20/0xa959726154953bae111746e265e6d754f48570e6/logo-transparent.png',
  },
  [ChainId.mainnet]: {
    chainId: 2020,
    address: '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4',
    decimals: 18,
    symbol: 'WRON',
    name: 'Wrapped Ronin',
    unit: 'ether',
    imageUrl:
      'https://cdn.skymavis.com/ronin/2020/erc20/0xe514d9deb7966c8be0ca922de8a064264ea6bcd4/logo-transparent.png',
  },
};
