import {gql} from 'graphql-tag';

export const GET_SORTED_EVENTS = gql`
  query SortedEvents($endTime: DateTime!, $startTime: DateTime!) {
    sortedEvents(endTime: $endTime, startTime: $startTime) {
      line1
      line2
      id
      startTime
      endTime
      videoUrl
      logo1
      logo2
      category {
        name
      }
      league {
        id
        name
        partner
      }
      sport {
        id
        name
      }
    }
  }
`;