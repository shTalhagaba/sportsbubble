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
        name
      }
      rightsHolders {
        name
        logoUrl
      }
      rightsHoldersConnection {
        totalCount
        edges {
          rhVideoUrl
          node {
            name
            logoUrl
          }
        }
      }
    }
  }
`;