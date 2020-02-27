import { combineReducers } from "redux";
import serviceReducer from "./serviceReducer";
import { SEARCH_REPO, SEARCH_DATA_STORAGE } from "../actions/ActionTypes";
export default combineReducers({
    searchRepoReducer: serviceReducer(SEARCH_REPO),
    searchDataStorage: serviceReducer(SEARCH_DATA_STORAGE)
});
