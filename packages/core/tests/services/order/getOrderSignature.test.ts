import { generateErc721Order, getErc721OrderSignature, Signer } from '../../../src';
import { generateErc1155Order } from '../../../src/services/order/generateOrderData';
import { getErc1155OrderSignature } from '../../../src/services/order/getOrderSignature';
import { erc721Order } from '../../data-mock/erc721';
import { erc1155Order } from '../../data-mock/erc1155';
import { chainId } from '../../data-mock/index';

const signer = {
  _signTypedData: () => 'Signature',
};

describe('test get order signature', () => {
  test('get erc721 order signature', () => {
    const signature = getErc721OrderSignature(chainId, signer as unknown as Signer, generateErc721Order(erc721Order));
    expect(signature).toBe('Signature');
  });

  test('get erc1155 order signature', () => {
    const signature = getErc1155OrderSignature(
      chainId,
      signer as unknown as Signer,
      generateErc1155Order(erc1155Order),
    );
    expect(signature).toBe('Signature');
  });
});
