

const initialState = {
  isLoggedIn: false,
  email: 'haa@gmail.com',
  firstName: '',
  lastName: '',
  id: '',
  user: false,
  eventList: [],
  splashEventList: [],
  expire: '',
  guest: false,
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
               // splash event list
               case 'SET_SPLASH_EVENT_LIST':
                console.log('SET_SPLASH_EVENT_LIST : ',action.payload)
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
           // event list
           case 'SET_EVENT_LIST':
            console.log('SET_EVENT_LIST : ',action.payload)
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
    default:
      return state;
  }
};

export default user;
