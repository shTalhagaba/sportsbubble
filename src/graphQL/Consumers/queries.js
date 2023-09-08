import { gql } from 'graphql-tag';

export const GET_CONSUMER = gql`
  query GetConsumer($oktaId: String!) {
    consumers(where: {oktaId: $oktaId}) {
        ...ConsumerDetail
  }
  }
`;

export const GET_MY_SPORT = gql`
query Query($where: FavoriteSportWhere, $consumersWhere2: ConsumerWhere) {
  consumers(where: $consumersWhere2) {
    name
    id
    cognitoId
    favoriteSports(where: $where) {
      id
      sport {
        id
        name
      }
      notifications
      categories {
        id
        name
      }
    }
    createdAt
  }
}
`;

export const GET_MY_SPORT_LIST = gql`
query($options: SportOptions, $where: SportWhere) {
  sports(options: $options, where: $where)  {
    name
    id
    showInPassport
    categories {
      id
      name
    }
  }
}
`;