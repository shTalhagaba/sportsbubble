import { gql } from 'graphql-tag';

//sample
export const GET_SELLER = gql`
  query GetSeller {
    seller {
      id
      shopName
      email
      phone
      verified
    }
  }
`;
