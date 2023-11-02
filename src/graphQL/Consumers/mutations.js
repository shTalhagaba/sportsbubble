import { gql } from 'graphql-tag';

export const CREATE_CONSUMER = gql`
mutation CreateConsumer($input: [ConsumerCreateInput!]!) {
  createConsumers(input: $input) {
    consumers {
      cognitoZip
      cognitoId
    }
  }
}`;

export const UPDATE_CONSUMERS = gql`
mutation UpdateConsumers($update: ConsumerUpdateInput, $where: ConsumerWhere) {
  updateConsumers(update: $update, where: $where) {
    consumers {
      cognitoId
      cognitoZip
      favoriteRightsHolders {
        name
      }
      favoriteSports {
        id
        notifications
        categories {
          name
        }
        sport {
          id
          name
        }
      }
    }
  }
}
`;

export const DELETE_CONSUMERS = gql`
mutation UpdateConsumers($where: ConsumerWhere, $delete: ConsumerDeleteInput) {
  updateConsumers(where: $where, delete: $delete) {
    consumers {
      favoriteSports {
        id
        notifications
        sport {
          name
          weight
        }
        categories {
          name
        }
      }
      cognitoId
    }
  }
}
`;

export const UPDATE_NOTIFICATION_CONSUMERS = gql`
mutation UpdateConsumers($where: ConsumerWhere, $update: ConsumerUpdateInput) {
  updateConsumers(where: $where, update: $update) {
    consumers {
      cognitoId
      favoriteSports {
        id
        notifications
        sport {
          id
          name
        }
        categories {
          name
        }
      }
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