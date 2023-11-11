const initialState = {
  isLoggedIn: false,
  email: null,
  firstName: '',
  lastName: '',
  id: '',
  token: '',
  jwtToken: '',
  refreshToken: '',
  userData: {},
  user: false,
  eventList: [],
  splashEventList: [],
  sportsList: [],
  expire: '',
  guest: false,
  refresh: false,
  selectedTimebar: -1,
  userSignupData: '',
  userEmail: '',
  userLoginVerified: false
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    // splash event list
    case 'SET_SPLASH_EVENT_LIST':
      try {
        return {
          ...state,
          splashEventList: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // set sportss list
    case 'SET_SPORTS_LIST':
      try {
        return {
          ...state,
          sportsList: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // event list
    case 'SET_EVENT_LIST':
      try {
        return {
          ...state,
          eventList: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // expire
    case 'SET_EXPIRE':
      try {
        return {
          ...state,
          expire: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // User Info
    case 'SET_USER':
      try {
        return {
          ...state,
          user: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // User Email
    case 'SET_USER_EMAIL':
      try {
        return {
          ...state,
          userEmail: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // User Email
    case 'SET_USER_LOGIN_VERIFIED':
      try {
        return {
          ...state,
          userLoginVerified: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // User signup data
    case 'SET_USER_SIGNUP_DATA':
      try {
        return {
          ...state,
          userSignupData: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // User Data Info
    case 'SET_USER_DATA':
      try {
        return {
          ...state,
          userData: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // token
    case 'SET_TOKEN':
      try {
        return {
          ...state,
          token: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // jwt token
    case 'SET_JWT_TOKEN':
      try {
        return {
          ...state,
          jwtToken: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // refresh token
    case 'SET_REFRESH_TOKEN':
      try {
        return {
          ...state,
          refreshToken: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // guest
    case 'SET_GUEST':
      try {
        return {
          ...state,
          guest: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // Login.
    case 'SIGN_IN_SUCCESS':
      try {
        action.payload.isLoggedIn = true;
        return action.payload;
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    case 'SIGN_IN_FAILURE':
      try {
        alert(action.payload);
        return state;
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // user data.
    case 'SIGN_IN_USER':
      try {
        action.payload.user = true;
        return action.payload;
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // refresh data.
    case 'REFRESH_DATA':
      try {
        return {
          ...state,
          refresh: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    // refresh data.
    case 'SELECTED_TIMEBAR':
      try {
        return {
          ...state,
          selectedTimebar: action.payload,
        };
      } catch (e) {
        alert(e);
        return state;
      }
      break;
    default:
      return state;
  }
};

export default user;
