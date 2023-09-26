import {gql} from 'graphql-tag';

export const SEARCH_EVENTS_QUERY = gql`
  query SearchEvents(
    $searchString: String!
    $startTime: DateTime!
    $endTime: DateTime!
  ) {
    searchEvent(
      searchString: $searchString
      startTime: $startTime
      endTime: $endTime
    ) {
      line1
      line2
      id
      startTime
      endTime
      logo1
      category {
        name
      }
      teams {
        id
        name
      }
      league {
        id
        name
        partner
      }
      sport {
        name
      }
      rightsHoldersConnection {
        edges {
          node {
            logoUrl
            name
            id
            weight
          }
          rhVideoUrl
        }
      }
    }
  }
`