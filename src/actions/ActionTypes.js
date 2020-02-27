const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const ADD_OBJECT = "ADD_OBJECT";

function createRequestTypes(base) {
    const res = {};
    [
        REQUEST,
        SUCCESS,
        FAILURE,
        CANCEL,
        CREATE,
        UPDATE,
        DELETE,
        ADD_OBJECT
    ].forEach(type => {
        res[type] = `${base}_${type}`;
    });
    return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = "GENERAL_ACTION";

export const NO_INTERNET = "NO_INTERNET";

export const SEARCH_REPO = createRequestTypes("SEARCH_REPO");
export const SEARCH_DATA_STORAGE = createRequestTypes("SEARCH_DATA_STORAGE");
