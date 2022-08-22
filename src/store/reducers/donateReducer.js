const initialState = {
  error: null,
  loading: false,
};

const donateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DONATE_START":
      return {
        ...state,
        loading: true,
      };

    case "DONATE_END":
      return {
        ...state,
        loading: false,
      };

    case "DONATE_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "DONATE_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default donateReducer;
