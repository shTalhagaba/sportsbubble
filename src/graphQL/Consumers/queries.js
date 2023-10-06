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

export const FETCH_ALL_RIGHTSHOLDERS = gql`
query {
  rightsHolders {
    name,
    logoUrl
  }
}
`
export const GET_FAVORITE_RIGHTSHOLDER = gql`
query ($cognitoId: String!) {
  consumers ( where: { cognitoId: $cognitoId } ) {
    favoriteRightsHolders {
      name
    }
  }
}
`

export const SELECT_FAVORITE_RIGHTSHOLDER = gql`
mutation ($cognitoId: String!, $rightsHolderName: String!) {
  updateConsumers (
    where: { cognitoId: $cognitoId },
    connect: { favoriteRightsHolders: { where: { node: { name: $rightsHolderName } } } }
  ) {
    consumers {
      cognitoId
      favoriteRightsHolders {
        name
      }
    }
  }
}
`

export const DELETE_FAVORITE_RIGHTSHOLDER = gql`
mutation ($cognitoId: String!, $rightsHolderName: String!) {
  updateConsumers (
    where: { cognitoId: $cognitoId },
    disconnect: { favoriteRightsHolders: { where: { node: { name: $rightsHolderName } } } }
  ) {
    consumers {
      cognitoId
      favoriteRightsHolders {
        name
      }
    }
  }
}
`
