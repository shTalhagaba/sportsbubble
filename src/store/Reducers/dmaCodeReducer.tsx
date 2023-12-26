const initialState = {
  code: null,
};

const dmaCode = (state = initialState, action: any) => {
  switch (action.type) {
    // dma code
    case 'SET_DMA_COdE':
      try {
        return {
          ...state,
          code: action.payload,
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

export default dmaCode;
