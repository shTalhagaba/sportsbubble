import {gql} from 'graphql-tag';

export const GET_SORTED_EVENTS = gql`
  query SortedEvents($endTime: DateTime!, $startTime: DateTime!) {
    sortedEvents(endTime: $endTime, startTime: $startTime) {
      line1
      line2
      id
      startTime
      endTime
      logo1
      category {
        id
        name
      }
      rightsHolders {
        name
        logoUrl
      }
      league {
        name
      }
      sport {
        id,
        name
      }
      rightsHoldersConnection {
        totalCount
        edges {
          rhVideoUrl
          dmaCodes
          node {
            name
            logoUrl
            weight
          }
        }
      }
    }
  }
`;

// isFeatured