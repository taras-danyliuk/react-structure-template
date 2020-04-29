export const initialState = {
  promises: {},
  shouldTrack: false,
};


const ssr = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SHOULD_TRACK":
      return {
        ...state,
        shouldTrack: action.payload,
      }

    case "ADD_PROMISE": {
      return {
        ...state,
        promises: {
          ...state.promises,
          [action.key]: action.promise
        }
      }
    }
    case "RESET_PROMISES":
      return {
        ...state,
        promises: {}
      }

    default:
      return state;
  }
};

export default ssr;
