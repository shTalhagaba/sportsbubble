import { gql } from '@apollo/client'

export const CREATE_CONSUMER = gql`
mutation CreateConsumer($input: [ConsumerCreateInput!]!) {
    createConsumers(input: $input) {
      consumers {
        ...ConsumerDetail
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