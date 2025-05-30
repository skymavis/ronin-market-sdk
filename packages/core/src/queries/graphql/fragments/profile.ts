import { gql } from 'graphql-request';

export const AddressesFragment = gql`
  fragment Addresses on NetAddresses {
    ethereum
    ronin
  }
`;

export const PublicProfileFragment = gql`
  fragment PublicProfile on PublicProfile {
    accountId
    addresses {
      ...Addresses
    }
    activated
    name
  }
  ${AddressesFragment}
`;
