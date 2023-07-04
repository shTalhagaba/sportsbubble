import { gql } from 'graphql-tag';

export const GET_CONSUMER = gql`
  query GetConsumer($oktaId: String!) {
    consumers(where: {oktaId: $oktaId}) {
        ...ConsumerDetail
  }
  }
`;