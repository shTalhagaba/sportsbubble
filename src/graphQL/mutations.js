import { gql } from 'graphql-tag';

//sample
export const USER_SIGNUP = gql`
  mutation CreateUser($input: SignUpInput) {
    createUser(input: $input) {
      success
      message
      fieldErrors {
        field
        message
      }
      data {
        _id
      }
    }
  }
`;
