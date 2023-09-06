import { gql } from 'graphql-tag';

export const CREATE_CONSUMER = gql`
mutation CreateConsumer($input: [ConsumerCreateInput!]!) {
  createConsumers(input: $input) {
    consumers {
      billingZip
      cognitoZip
      cognitoId
      dob
      oktaId
      pronouns
    }
  }
}`;

export const UPDATE_CONSUMERS = gql`
  mutation UpdateConsumers($where: ConsumerWhere, $create: ConsumerRelationInput, $connectOrCreate: ConsumerConnectOrCreateInput) {
    updateConsumers(where: $where, create: $create, connectOrCreate: $connectOrCreate) {
      consumers {
        id
        name
        favoriteSports {
          id
          notifications
          sport {
            id
            name
            genre
            weight
          }
          categories {
            id
            name
          }
        }
        cognitoId
      }
    }
  }
`;

export const DELETE_CONSUMERS = gql`
mutation UpdateConsumers($where: ConsumerWhere, $delete: ConsumerDeleteInput) {
  updateConsumers(where: $where, delete: $delete) {
    consumers {
      id
      name
      favoriteSports {
        id
        notifications
        sport {
          id
          name
          genre
          weight
        }
        categories {
          id
          name
        }
      }
      cognitoId
    }
  }
}
`;

export const CONSUMER_DETAIL = gql`
  fragment ConsumerDetail on Consumer {
      oktaId
      billingZip
      pronouns
      dob
      cognitoId
      cognitoZip
  }
  `;

export const EDIT_CONSUMER = gql`
  mutation EditConsumer($oktaId: String, $update: ConsumerUpdateInput!) {
    updateConsumers(update: $update, where: {oktaId: $oktaId} ) {
      consumers {
          ...ConsumerDetail
      }
    }
  }
  `;