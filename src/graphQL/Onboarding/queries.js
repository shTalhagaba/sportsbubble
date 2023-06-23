import { gql } from '@apollo/client'

export const SPORTS_LIST_QUERY = gql`
  query SportsList {
    sports(where: { weight_NOT: null }, options: { sort: { weight: ASC } }) {
      id
      name
      weight
    }
  }
`;

export const PROVIDERS_LIST_QUERY = gql`
  query ProvidersList {
    rightsHolders(where: { weight_NOT: null }, options: { sort: { weight: ASC } }) {
      id
      name
      weight
      logoUrl
      providerType
    }
  }
`;
