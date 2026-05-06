export * from './order';
export * from './wallet';

export enum ChainId {
  mainnet = 2020,
  testnet = 202601,
}

export enum SpenderContractType {
  MarketGatewayContract = 'MarketGatewayContract',
  MarketGatewayMultiSendContract = 'MarketGatewayMultiSendContract',
}
