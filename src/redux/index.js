import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import { SEARCH_REPO } from "../actions/ActionTypes";
export default combineReducers({
    searchRepoReducer: serviceReducer(SEARCH_REPO)
});
