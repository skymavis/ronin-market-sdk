import { gql } from 'graphql-request';

import { OrderFragment } from '../fragments/order';

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: InputOrder!, $signature: String!, $maker: String!) {
    createOrder(order: $order, signature: $signature, maker: $maker) {
      ...Order
    }
  }
  ${OrderFragment}
`;
