import { gql } from 'graphql-tag';

export const GET_CONSUMER = gql`
  query GetConsumer($oktaId: String!) {
    consumers(where: {oktaId: $oktaId}) {
        ...ConsumerDetail
  }
  }
`;

export const GET_USER_FAVOURITE_SPORTS = gql`
query ($cognitoId: String!) {
  consumers(where: { cognitoId: $cognitoId }) {
    cognitoZip
    cognitoId
    favoriteSports {
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
`;

export const GET_ALL_SPORTS = gql`
query {
  sports(where: { showInPassport: true }) {
    id
    name
    weight
    logo1
    categories {
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
