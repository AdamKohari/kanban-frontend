import { call, put, takeEvery } from 'redux-saga/effects'
import {loginUserAPI, registerUserAPI} from "./Api";
import {
    displayMessage,
    GET_USER_DATA,
    loadingEnd,
    loadingStart,
    LOGIN,
    LOGIN_SUCCESS,
    MyAction,
    REGISTER
} from "./actions";

function* getUserData(action: MyAction): any {
    // try {
    //     const user = yield call(getUserDataAPI, action.payload);
    //     yield put({type: GET_USER_DATA_SUCCESS, payload: user});
    // } catch (ex) {
    //     yield put({type: GET_USER_DATA_FAILED, payload: ex.message});
    // }
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
    yield takeEvery(GET_USER_DATA, getUserData);
    yield takeEvery(LOGIN, login);
    yield takeEvery(REGISTER, register);
}

export default mySaga;