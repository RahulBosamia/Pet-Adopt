const initialState = {
  error: null,
  loading: false,
  data: null,
  userpets: null,
};

const adoptReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADOPT_START":
      return {
        ...state,
        loading: true,
      };

    case "ADOPT_END":
      return {
        ...state,
        loading: false,
      };

    case "ADOPT_SUCCESS":
      return {
        ...state,
        error: null,
        data: action.payload.data,
        userpets: action.payload.userpets,
      };
    case "ADOPT_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adoptReducer;
