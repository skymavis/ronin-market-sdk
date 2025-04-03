import { gql } from 'graphql-request';

export const AssetFragment = gql`
  fragment Asset on Asset {
    erc
    address
    id
    quantity
  }
`;

export const AssetInfoFragment = gql`
  fragment AssetInfo on Asset {
    erc
    address
    id
    quantity
    orderId
  }
`;
