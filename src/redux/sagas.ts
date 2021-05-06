import { call, put, takeEvery } from 'redux-saga/effects'
import {getUserDataAPI, loginUserAPI, registerUserAPI} from "./Api";
import {
    displayMessage,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    loadingEnd,
    loadingStart,
    LOGIN,
    LOGIN_SUCCESS,
    MyAction,
    REGISTER
} from "./actions";

function* getUserData(): any {
    try {
        yield put(loadingStart());
        const userData = yield call(getUserDataAPI);
        yield put({type: GET_USER_DATA_SUCCESS, payload: userData});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, ex, {type: 'error'});
    }
}

function* login(action: MyAction): any {
    try {
        yield put(loadingStart());
        yield call(loginUserAPI, action.payload);
        yield put({type: LOGIN_SUCCESS});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, ex, {type: 'error'});
    }
}

function* register(action: MyAction): any {
    try {
        yield put(loadingStart());
        yield call(registerUserAPI, action.payload);
        yield put(displayMessage('Registered successfully!', {type: 'success'}));
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, ex, {type: 'error'});
    }
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(REGISTER, register);
    yield takeEvery(GET_USER_DATA, getUserData);
}

export default mySaga;