import { gql } from '@apollo/client'

export const EVENT_DETAIL_FRAGMENT = gql`
  fragment EventDetail on Event {
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
    teams {
      ...TeamDetail
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
    rightsHolders {
      ...ProviderDetail
    }
    rightsHoldersConnection {
      ...RightsHoldersConnectionDetail
    }
  }
`;

export const TEAM_DETAIL_FRAGMENT = gql`
  fragment TeamDetail on Team {
    id
    name
  }
`;

export const PROVIDER_DETAIL_FRAGMENT = gql`
  fragment ProviderDetail on Provider {
    // Provider fields go here
  }
`;

export const RIGHTS_HOLDERS_CONNECTION_DETAIL_FRAGMENT = gql`
  fragment RightsHoldersConnectionDetail on RightsHoldersConnection {
    // RightsHoldersConnection fields go here
  }
`;

export const EVENTS_LIST_QUERY = gql`
  query EventsList($startTime: DateTime!, $endTime: DateTime!) {
    sortedEvents(startTime: $startTime, endTime: $endTime) {
      ...EventDetail
    }
  }
  
  ${EVENT_DETAIL_FRAGMENT}
`;

export const GET_EVENT_DETAIL_QUERY = gql`
  query GetEventDetailById($id: ID!) {
    events(where: { id: $id }) {
      ...EventDetail
    }
  }
  
  ${EVENT_DETAIL_FRAGMENT}
`;

export const SEARCH_EVENTS_QUERY = gql`
  query SearchEvents($searchString: String!, $startTime: DateTime!, $endTime: DateTime!) {
    searchEvent(searchString: $searchString, startTime: $startTime, endTime: $endTime) {
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
    }
  }
`;

