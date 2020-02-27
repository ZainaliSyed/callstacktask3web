import { GENERAL_ACTION } from "./ActionTypes";

// callback = () => {};

Request = {
    url: String, //Service url
    method: String, //Web Service type 'post,get,put,delete....'
    data: Object, //Paramter for request
    actionType: Object
};
export function request(
    url, //Service url
    method, //Web Service type 'post,get,put,delete....'
    data, //Paramter for request
    actionType = null, //Action Type
    showHud = true, //Show spinner
    successCB,
    failureCB
) {
    return {
        type: GENERAL_ACTION,
        actionType,
        url,
        method,
        data,
        showHud,
        successCB,
        failureCB
    };
}

export function requestAction(types) {
    return {
        type: types.REQUEST
    };
}
export function success(types, data) {
    return {
        data,
        type: types.SUCCESS
    };
}

export function failure(types, errorMessage) {
    return {
        errorMessage,
        type: types.FAILURE
    };
}

export function generalSaveAction(
    type: string,
    data: object,
    isConcat: Boolean = false,
    meta: Object
) {
    return {
        type,
        data,
        isConcat,
        meta
    };
}
