import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSaga from "redux-saga";
import { createLogger } from "redux-logger";

// import reducers from "./modules/";

import rootSaga from "../sagas";

// new
// import serviceReducer from "../redux/serviceReducer";
// import { SEARCH_REPO } from "../actions/ActionTypes";

import redux from "../redux";
const saga = createSaga();
const logger = createLogger({ diff: true });

const middlewareEnhancer = (() =>
    process.env.NODE_ENV === "development"
        ? composeWithDevTools(applyMiddleware(saga, logger))
        : applyMiddleware(saga))();

export default createStore(redux, undefined, middlewareEnhancer);
// export default createStore(
//     combineReducers({ searchRepoReducer: serviceReducer(SEARCH_REPO) }),
//     undefined,
//     middlewareEnhancer
// );
// export default createStore(
//     combineReducers(reducers),
//     undefined,
//     middlewareEnhancer
// );

saga.run(rootSaga);
