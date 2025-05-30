/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  RoyaltyRegistry,
  RoyaltyRegistryInterface,
} from "../RoyaltyRegistry";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ExceedBpsCap",
    type: "error",
  },
  {
    inputs: [],
    name: "FeeSettingsDoNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBasicPoints",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRecipient",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRoyaltyLookupAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "TotalRecipientAmountExceedsUpperBound",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedCaller",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "bps",
                type: "uint16",
              },
            ],
            internalType: "struct FeeDistribution[]",
            name: "feeDists",
            type: "tuple[]",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct FeeSettings",
        name: "settings",
        type: "tuple",
      },
    ],
    name: "PlatformFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "royaltyAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "RoyaltyAddressLookupRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "bps",
                type: "uint16",
              },
            ],
            internalType: "struct FeeDistribution[]",
            name: "feeDists",
            type: "tuple[]",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct FeeSettings",
        name: "settings",
        type: "tuple",
      },
    ],
    name: "RoyaltyFeeUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "BASIC_POINT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLATFORM_BPS_CAP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROYALTY_BPS_CAP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "deletePlatformFee",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "deleteRoyaltyFee",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fallbackERC2981",
        type: "bool",
      },
    ],
    name: "getPlatformAndRoyaltyFees",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Recipient[]",
        name: "recipients",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "getPlatformFeeSettings",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "bps",
                type: "uint16",
              },
            ],
            internalType: "struct FeeDistribution[]",
            name: "feeDists",
            type: "tuple[]",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct FeeSettings",
        name: "settings",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "getPlatformFees",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Recipient[]",
        name: "recipients",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "getRoyaltyFeeSettings",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "bps",
                type: "uint16",
              },
            ],
            internalType: "struct FeeDistribution[]",
            name: "feeDists",
            type: "tuple[]",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct FeeSettings",
        name: "settings",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fallbackERC2981",
        type: "bool",
      },
    ],
    name: "getRoyaltyFees",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Recipient[]",
        name: "recipients",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "operators",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "platforms",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "collections",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "bps",
            type: "uint16",
          },
        ],
        internalType: "struct FeeDistribution[][]",
        name: "feeDists",
        type: "tuple[][]",
      },
    ],
    name: "initialize",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "lookupRoyaltyAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "bps",
            type: "uint16",
          },
        ],
        internalType: "struct FeeDistribution[]",
        name: "feeDist",
        type: "tuple[]",
      },
    ],
    name: "overrideRoyaltyFee",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "address",
        name: "royaltyAddress",
        type: "address",
      },
    ],
    name: "registerRoyaltyAddress",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fallbackERC2981",
        type: "bool",
      },
    ],
    name: "tryGetPlatformAndRoyaltyFees",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Recipient[]",
        name: "recipients",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "bps",
            type: "uint16",
          },
        ],
        internalType: "struct FeeDistribution[]",
        name: "feeDist",
        type: "tuple[]",
      },
    ],
    name: "updatePlatformFees",
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class RoyaltyRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): RoyaltyRegistryInterface {
    return new utils.Interface(_abi) as RoyaltyRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoyaltyRegistry {
    return new Contract(address, _abi, signerOrProvider) as RoyaltyRegistry;
  }
}
