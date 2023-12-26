const initialState = {
  userVerified: null,
};

const signup = (state = initialState, action: any) => {
  switch (action.type) {
    // User Verified
    case 'SET_USER_VERIFIED':
      try {
        return {
          ...state,
          userVerified: action.payload,
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

export default signup;
