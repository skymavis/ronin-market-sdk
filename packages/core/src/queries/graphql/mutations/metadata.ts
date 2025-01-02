import { gql } from 'graphql-request';

export const REFRESH_METADATA = gql`
  mutation RefreshMetadata($tokenAddress: String!, $tokenId: String!) {
    refreshMetadata(tokenAddress: $tokenAddress, tokenId: $tokenId)
  }
`;
