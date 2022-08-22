const initialState = {
    error: null,
    loading: false
  };
  
const deletePetReducer = (state= initialState, action) => {
    switch (action.type) {
        case "DELETE_START":
          return {
            ...state,
            loading: true,
          };
    
        case "DELETE_END":
          return {
            ...state,
            loading: false,
          };
    
        case "DELETE_SUCCESS":
          return {
            ...state,
            error: null,
          };
        case "DELETE_FAIL":
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
export default deletePetReducer;