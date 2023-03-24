

const initialState = {
  isLoggedIn: false,
  email: 'haa@gmail.com',
  firstName: '',
  lastName: '',
  id: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default user;
