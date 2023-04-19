export const login = (args: any) => {
    return {
      type: 'SIGN_IN',
      payload: args,
    };
};

export const setUser = (args: any) => {
  return {
    type: 'SET_USER',
    payload: args,
  };
};
  
export const loginData = (args: any) => {
  return {
    type: 'SIGN_IN_USER',
    payload: args,
  };
};
  