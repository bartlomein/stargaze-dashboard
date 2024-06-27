export const ITEMS_BY_WALLET = `query Tokens($owner: String, $limit: Int) {
    tokens(owner: $owner, limit: $limit) {
      tokens {
        media {
          visualAssets {
            lg {
              staticUrl
            }
          }
        }
        id
        description
        lastSalePrice {
          amountUsd
        }
      }
    }
  }`;

export const API = `https://graphql.mainnet.stargaze-apis.com/graphql`;
