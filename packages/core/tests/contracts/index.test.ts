import { ethers } from 'ethers';

import { getConfig, paymentTokens, wRonToken } from '../../src';
import {
  createContract,
  createErc20Contract,
  createErc721Contract,
  createErc1155Contract,
  createErc1155MarketGatewayContract,
  createKatanaContract,
  createMarketCommissionContract,
  createReadOnlyProvider,
  createWRonContract,
  Erc20,
  Erc721,
  Erc1155,
  Erc1155MarketGatewayContract,
  MarketCommission,
  Wron,
} from '../../src/contracts';
import ERC721_ABI from '../../src/contracts/abis/erc721.json';
import { chainId, erc721TokenAddress, erc1155TokenAddress } from '../data-mock';

describe('test contracts', () => {
  test('create contract', () => {
    const contract = createContract<Erc721>(erc721TokenAddress, ERC721_ABI);

    expect(typeof contract).toBeInstanceOf<Erc721>;
    expect(contract.address).toBe(erc721TokenAddress);
  });

  test('create erc721 contract', () => {
    const contract = createErc721Contract(erc721TokenAddress);

    expect(typeof contract).toBeInstanceOf<Erc721>;
    expect(contract.address).toBe(erc721TokenAddress);
  });

  test('create erc1155 contract', () => {
    const contract = createErc1155Contract(erc1155TokenAddress);

    expect(typeof contract).toBeInstanceOf<Erc1155>;
    expect(contract.address).toBe(erc1155TokenAddress);
  });

  test('create erc20 contract', () => {
    const wethAddress = paymentTokens[chainId].WETH.address;

    const contract = createErc20Contract(wethAddress);

    expect(typeof contract).toBeInstanceOf<Erc20>;
    expect(contract.address).toBe(wethAddress);
  });

  test('create katana contract', () => {
    const config = getConfig(chainId);
    const katanaContractAddress = config.contractsAddress.katana;
    const contract = createKatanaContract(chainId);

    expect(typeof contract).toBeInstanceOf<Erc20>;
    expect(contract.address).toBe(katanaContractAddress);
  });

  test('create commission contract', () => {
    const config = getConfig(chainId);
    const marketCommissionAddress = config.contractsAddress.marketCommission;
    const contract = createMarketCommissionContract(chainId);

    expect(typeof contract).toBeInstanceOf<MarketCommission>;
    expect(contract.address).toBe(marketCommissionAddress);
  });

  test('create erc1155 market gateway contract', () => {
    const config = getConfig(chainId);
    const marketGatewayAddress = config.contractsAddress.marketGateway;
    const contract = createErc1155MarketGatewayContract(chainId);

    expect(typeof contract).toBeInstanceOf<Erc1155MarketGatewayContract>;
    expect(contract.address).toBe(marketGatewayAddress);
  });

  test('create wron contract', () => {
    const wRonAddress = wRonToken[chainId].address;
    const contract = createWRonContract(chainId);

    expect(typeof contract).toBeInstanceOf<Wron>;
    expect(contract.address).toBe(wRonAddress);
  });

  test('create read only provider', () => {
    const provider = createReadOnlyProvider(chainId);

    expect(typeof provider).toBeInstanceOf<ethers.providers.StaticJsonRpcProvider>;
    expect(provider.network.chainId).toBe(chainId);
  });
});
