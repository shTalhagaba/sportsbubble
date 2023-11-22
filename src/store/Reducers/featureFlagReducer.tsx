const initialState = {
  flags: null,
};

const featureFlag = (state = initialState, action: any) => {
  switch (action.type) {
    // dma code
    case 'SET_FEATURE_FLAG':
      try {
        return {
          ...state,
          flags: action.payload,
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

export default featureFlag;
