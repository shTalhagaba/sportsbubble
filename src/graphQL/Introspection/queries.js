import { gql } from 'graphql-tag';

export const INTROSPECTION_QUERY = gql`
  query Introspection {
    __schema {
      types {
        name
      }
    }
  }
`;