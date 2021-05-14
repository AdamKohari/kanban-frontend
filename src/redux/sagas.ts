import { call, put, takeEvery } from 'redux-saga/effects'
import {createCardAPI, createProjectAPI, getBoardAPI, getUserDataAPI, loginUserAPI, registerUserAPI} from "./Api";
import {CREATE_CARD, CREATE_PROJECT, displayMessage, GET_BOARD, GET_BOARD_SUCCESS, GET_USER_DATA,
    GET_USER_DATA_SUCCESS, loadingEnd, loadingStart, LOGIN, LOGIN_SUCCESS, MyAction, REGISTER
} from "./actions";
import {humanizeError} from "./humanizeError";

function* login(action: MyAction): any {
    try {
        yield put(loadingStart());
        yield call(loginUserAPI, action.payload);
        yield put({type: LOGIN_SUCCESS});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
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
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
    }
}

function* getUserData(): any {
    try {
        yield put(loadingStart());
        const userData = yield call(getUserDataAPI);
        yield put({type: GET_USER_DATA_SUCCESS, payload: userData});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
    }
}

function* createProject(action: MyAction): any {
    try {
        yield put(loadingStart());
        yield call(createProjectAPI, action.payload);
        yield put(displayMessage('Project created successfully!', {type: 'success'}));
        const userData = yield call(getUserDataAPI);
        yield put({type: GET_USER_DATA_SUCCESS, payload: userData});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
    }
}

function* getBoard(action: MyAction): any {
    try {
        yield put(loadingStart());
        const boardData = yield call(getBoardAPI, action.payload);
        yield put({type: GET_BOARD_SUCCESS, payload: boardData});
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
    }
}

function* createCard(action: MyAction): any {
    try {
        yield put(loadingStart());
        yield call(createCardAPI, action.payload);
        yield put(displayMessage('Card created successfully!', {type: 'success'}));
        yield put(loadingEnd());
    } catch (ex) {
        yield put(loadingEnd());
        yield call(displayMessage, humanizeError(ex), {type: 'error'});
    }
}

function* mySaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(REGISTER, register);
    yield takeEvery(GET_USER_DATA, getUserData);
    yield takeEvery(CREATE_PROJECT, createProject);
    yield takeEvery(GET_BOARD, getBoard);
    yield takeEvery(CREATE_CARD, createCard);
}

export default mySaga;