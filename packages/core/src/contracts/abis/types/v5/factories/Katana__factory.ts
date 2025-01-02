/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Katana, KatanaInterface } from "../Katana";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_WRON",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    constant: true,
    inputs: [],
    name: "WRON",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRONMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityRON",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRON",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveB",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountB",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountB",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRONMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityRON",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRON",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRONMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityRONSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountRON",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRONMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityRONWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRON",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountRONMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityRONWithPermitSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountRON",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountB",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactRONForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactRONForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForRON",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForRONSupportingFeeOnTransferTokens",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapRONForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactRON",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Katana__factory {
  static readonly abi = _abi;
  static createInterface(): KatanaInterface {
    return new utils.Interface(_abi) as KatanaInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Katana {
    return new Contract(address, _abi, signerOrProvider) as Katana;
  }
}
