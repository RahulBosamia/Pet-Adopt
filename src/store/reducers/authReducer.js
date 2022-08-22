const initialState = {
  error: null,
  loading: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
      };
    case "AUTH_END":
      return {
        ...state,
        loading: false,
      };
    
    case "AUTH_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    
    case "AUTH_SUCCESS":
        return {
          ...state,
          error: null,
        };

    default:
      return state;
  }
};
export default authReducer;
