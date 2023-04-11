export const login = (args: any) => {
    return {
      type: 'SIGN_IN',
      payload: args,
    };
};
  
export const loginData = (args: any) => {
  return {
    type: 'SIGN_IN_USER',
    payload: args,
  };
};
  