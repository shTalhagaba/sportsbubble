import { gql } from '@apollo/client'

export const INTROSPECTION_QUERY = gql`
  query Introspection {
    __schema {
      types {
        name
      }
    }
  }
`;