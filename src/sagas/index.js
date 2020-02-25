// import { all } from "redux-saga/effects";

// export default function* rootSaga() {
//     yield all([]);
// }

import { fork } from "redux-saga/effects";
// import init from "./init";
import serviceSaga from "./serviceSaga";

export default function* root() {
    yield fork(serviceSaga);
}
