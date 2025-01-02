/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type AssetStruct = {
  erc: PromiseOrValue<BigNumberish>;
  addr: PromiseOrValue<string>;
  id: PromiseOrValue<BigNumberish>;
  quantity: PromiseOrValue<BigNumberish>;
};

export type AssetStructOutput = [number, string, BigNumber, BigNumber] & {
  erc: number;
  addr: string;
  id: BigNumber;
  quantity: BigNumber;
};

export type GenericOrderStruct = {
  maker: PromiseOrValue<string>;
  kind: PromiseOrValue<BigNumberish>;
  assets: AssetStruct[];
  expiredAt: PromiseOrValue<BigNumberish>;
  paymentToken: PromiseOrValue<string>;
  startedAt: PromiseOrValue<BigNumberish>;
  baseUnitPrice: PromiseOrValue<BigNumberish>;
  endedAt: PromiseOrValue<BigNumberish>;
  endedUnitPrice: PromiseOrValue<BigNumberish>;
  expectedState: PromiseOrValue<BigNumberish>;
  nonce: PromiseOrValue<BigNumberish>;
  hash: PromiseOrValue<BytesLike>;
  verified: PromiseOrValue<boolean>;
};

export type GenericOrderStructOutput = [
  string,
  number,
  AssetStructOutput[],
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  string,
  boolean
] & {
  maker: string;
  kind: number;
  assets: AssetStructOutput[];
  expiredAt: BigNumber;
  paymentToken: string;
  startedAt: BigNumber;
  baseUnitPrice: BigNumber;
  endedAt: BigNumber;
  endedUnitPrice: BigNumber;
  expectedState: BigNumber;
  nonce: BigNumber;
  hash: string;
  verified: boolean;
};

export type GenericOrderExtendedStruct = {
  info: GenericOrderStruct;
  realPrice: PromiseOrValue<BigNumberish>;
  extraData: PromiseOrValue<BytesLike>;
  recipient: PromiseOrValue<string>;
  refunder: PromiseOrValue<string>;
};

export type GenericOrderExtendedStructOutput = [
  GenericOrderStructOutput,
  BigNumber,
  string,
  string,
  string
] & {
  info: GenericOrderStructOutput;
  realPrice: BigNumber;
  extraData: string;
  recipient: string;
  refunder: string;
};

export type SettleParameterStruct = {
  orderData: PromiseOrValue<BytesLike>;
  signature: PromiseOrValue<BytesLike>;
  referralAddr: PromiseOrValue<string>;
  expectedState: PromiseOrValue<BigNumberish>;
  recipient: PromiseOrValue<string>;
  refunder: PromiseOrValue<string>;
};

export type SettleParameterStructOutput = [
  string,
  string,
  string,
  BigNumber,
  string,
  string
] & {
  orderData: string;
  signature: string;
  referralAddr: string;
  expectedState: BigNumber;
  recipient: string;
  refunder: string;
};

export declare namespace IMarketCommission {
  export type AllocationStruct = {
    allocType: PromiseOrValue<BigNumberish>;
    recipient: PromiseOrValue<string>;
    owner: PromiseOrValue<string>;
    ratio: PromiseOrValue<BigNumberish>;
    value: PromiseOrValue<BigNumberish>;
  };

  export type AllocationStructOutput = [
    number,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    allocType: number;
    recipient: string;
    owner: string;
    ratio: BigNumber;
    value: BigNumber;
  };
}

export interface MavisExchangeInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "MARKET_OPERATOR()": FunctionFragment;
    "cancelOrder(bytes)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "getState((uint8,address,uint256,uint256)[])": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "increaseNonceMaker()": FunctionFragment;
    "interfaceName()": FunctionFragment;
    "makerNonce(address)": FunctionFragment;
    "orderFinalized(bytes32)": FunctionFragment;
    "orderValid(bytes32,bytes)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "settleOrder((bytes,bytes,address,uint256,address,address),uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "swapRONAndSettleOrder((bytes,bytes,address,uint256,address,address),uint256,address[])": FunctionFragment;
    "swapTokensAndSettleOrder((bytes,bytes,address,uint256,address,address),uint256,uint256,address[])": FunctionFragment;
    "tryBulkCancelOrderByHash(bytes32[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "MARKET_OPERATOR"
      | "cancelOrder"
      | "getRoleAdmin"
      | "getRoleMember"
      | "getRoleMemberCount"
      | "getState"
      | "grantRole"
      | "hasRole"
      | "increaseNonceMaker"
      | "interfaceName"
      | "makerNonce"
      | "orderFinalized"
      | "orderValid"
      | "renounceRole"
      | "revokeRole"
      | "settleOrder"
      | "supportsInterface"
      | "swapRONAndSettleOrder"
      | "swapTokensAndSettleOrder"
      | "tryBulkCancelOrderByHash"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MARKET_OPERATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getState",
    values: [AssetStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseNonceMaker",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "interfaceName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "makerNonce",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "orderFinalized",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "orderValid",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "settleOrder",
    values: [SettleParameterStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "swapRONAndSettleOrder",
    values: [
      SettleParameterStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapTokensAndSettleOrder",
    values: [
      SettleParameterStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tryBulkCancelOrderByHash",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MARKET_OPERATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseNonceMaker",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "interfaceName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "makerNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "orderFinalized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "orderValid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "settleOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapRONAndSettleOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapTokensAndSettleOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tryBulkCancelOrderByHash",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "MakerNonceUpdated(address,uint256)": EventFragment;
    "OrderCancelled(bytes32,address)": EventFragment;
    "OrderMatched(tuple,uint256,address,address,uint256,tuple[])": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MakerNonceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderMatched"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MakerNonceUpdatedEventObject {
  maker: string;
  nonce: BigNumber;
}
export type MakerNonceUpdatedEvent = TypedEvent<
  [string, BigNumber],
  MakerNonceUpdatedEventObject
>;

export type MakerNonceUpdatedEventFilter =
  TypedEventFilter<MakerNonceUpdatedEvent>;

export interface OrderCancelledEventObject {
  arg0: string;
  requester: string;
}
export type OrderCancelledEvent = TypedEvent<
  [string, string],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

export interface OrderMatchedEventObject {
  order: GenericOrderExtendedStructOutput;
  settlePrice: BigNumber;
  settleToken: string;
  matcher: string;
  acceptedSettlePrice: BigNumber;
  receivedAllocs: IMarketCommission.AllocationStructOutput[];
}
export type OrderMatchedEvent = TypedEvent<
  [
    GenericOrderExtendedStructOutput,
    BigNumber,
    string,
    string,
    BigNumber,
    IMarketCommission.AllocationStructOutput[]
  ],
  OrderMatchedEventObject
>;

export type OrderMatchedEventFilter = TypedEventFilter<OrderMatchedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface MavisExchange extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MavisExchangeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MARKET_OPERATOR(overrides?: CallOverrides): Promise<[string]>;

    cancelOrder(
      orderData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getState(
      assets: AssetStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    increaseNonceMaker(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    interfaceName(overrides?: CallOverrides): Promise<[string]>;

    makerNonce(
      maker: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    orderFinalized(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    orderValid(
      hash: PromiseOrValue<BytesLike>,
      orderData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    settleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    swapRONAndSettleOrder(
      settleInfo: SettleParameterStruct,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapTokensAndSettleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tryBulkCancelOrderByHash(
      hashList: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  MARKET_OPERATOR(overrides?: CallOverrides): Promise<string>;

  cancelOrder(
    orderData: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMember(
    role: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getState(
    assets: AssetStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  increaseNonceMaker(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  interfaceName(overrides?: CallOverrides): Promise<string>;

  makerNonce(
    maker: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  orderFinalized(
    hash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  orderValid(
    hash: PromiseOrValue<BytesLike>,
    orderData: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  settleOrder(
    settleInfo: SettleParameterStruct,
    settlePrice: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  swapRONAndSettleOrder(
    settleInfo: SettleParameterStruct,
    deadline: PromiseOrValue<BigNumberish>,
    path: PromiseOrValue<string>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapTokensAndSettleOrder(
    settleInfo: SettleParameterStruct,
    settlePrice: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    path: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tryBulkCancelOrderByHash(
    hashList: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    MARKET_OPERATOR(overrides?: CallOverrides): Promise<string>;

    cancelOrder(
      orderData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getState(
      assets: AssetStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    increaseNonceMaker(overrides?: CallOverrides): Promise<void>;

    interfaceName(overrides?: CallOverrides): Promise<string>;

    makerNonce(
      maker: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    orderFinalized(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    orderValid(
      hash: PromiseOrValue<BytesLike>,
      orderData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    settleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    swapRONAndSettleOrder(
      settleInfo: SettleParameterStruct,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    swapTokensAndSettleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    tryBulkCancelOrderByHash(
      hashList: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MakerNonceUpdated(address,uint256)"(
      maker?: null,
      nonce?: null
    ): MakerNonceUpdatedEventFilter;
    MakerNonceUpdated(maker?: null, nonce?: null): MakerNonceUpdatedEventFilter;

    "OrderCancelled(bytes32,address)"(
      arg0?: null,
      requester?: null
    ): OrderCancelledEventFilter;
    OrderCancelled(arg0?: null, requester?: null): OrderCancelledEventFilter;

    "OrderMatched(tuple,uint256,address,address,uint256,tuple[])"(
      order?: null,
      settlePrice?: null,
      settleToken?: null,
      matcher?: null,
      acceptedSettlePrice?: null,
      receivedAllocs?: null
    ): OrderMatchedEventFilter;
    OrderMatched(
      order?: null,
      settlePrice?: null,
      settleToken?: null,
      matcher?: null,
      acceptedSettlePrice?: null,
      receivedAllocs?: null
    ): OrderMatchedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MARKET_OPERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    cancelOrder(
      orderData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getState(
      assets: AssetStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseNonceMaker(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    interfaceName(overrides?: CallOverrides): Promise<BigNumber>;

    makerNonce(
      maker: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    orderFinalized(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    orderValid(
      hash: PromiseOrValue<BytesLike>,
      orderData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    settleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapRONAndSettleOrder(
      settleInfo: SettleParameterStruct,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapTokensAndSettleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tryBulkCancelOrderByHash(
      hashList: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MARKET_OPERATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cancelOrder(
      orderData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getState(
      assets: AssetStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseNonceMaker(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    interfaceName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    makerNonce(
      maker: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orderFinalized(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orderValid(
      hash: PromiseOrValue<BytesLike>,
      orderData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    settleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapRONAndSettleOrder(
      settleInfo: SettleParameterStruct,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapTokensAndSettleOrder(
      settleInfo: SettleParameterStruct,
      settlePrice: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      path: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tryBulkCancelOrderByHash(
      hashList: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
