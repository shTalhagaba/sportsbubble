

const initialState = {
  isLoggedIn: false,
  email: 'haa@gmail.com',
  firstName: '',
  lastName: '',
  id: '',
  user: false,
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
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
