import { gql } from 'graphql-request';

export const GET_EXCHANGE_RATE = gql`
  query GetExchangeRate {
    exchangeRate {
      eth {
        usd
      }
      slp {
        usd
      }
      ron {
        usd
      }
      axs {
        usd
      }
      usd {
        usd
      }
    }
  }
`;
