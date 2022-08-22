import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import donateReducer from "./donateReducer";
import adoptReducer from "./adoptReducer";
import deletePetReducer from "./deletePetReducer";

export default combineReducers({
  auth: authReducer,
  donate: donateReducer,
  adopt: adoptReducer,
  deletePet: deletePetReducer,
  firebase: firebaseReducer,
});
