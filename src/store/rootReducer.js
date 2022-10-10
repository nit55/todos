import { combineReducers } from "redux";
import home from "../containers/home/homeReducer";

const rootState = { home };

const rootReducer = combineReducers(rootState);

export default rootReducer;
