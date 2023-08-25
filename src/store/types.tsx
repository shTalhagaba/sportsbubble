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

export const setUserData = (args: any) => {
  return {
    type: 'SET_USER_DATA',
    payload: args,
  };
};

export const setToken = (args: any) => {
  return {
    type: 'SET_TOKEN',
    payload: args,
  };
};

export const setJwtToken = (args: any) => {
  return {
    type: 'SET_JWT_TOKEN',
    payload: args,
  };
};

export const setGuest = (args: any) => {
  return {
    type: 'SET_GUEST',
    payload: args,
  };
};

export const setStoreEventList = (args: any) => {
  return {
    type: 'SET_EVENT_LIST',
    payload: args,
  };
};

export const setSplashEventList = (args: any) => {
  return {
    type: 'SET_SPLASH_EVENT_LIST',
    payload: args,
  };
};

export const setExpire = (args: any) => {
  return {
    type: 'SET_EXPIRE',
    payload: args,
  };
};

export const loginData = (args: any) => {
  return {
    type: 'SIGN_IN_USER',
    payload: args,
  };
};
