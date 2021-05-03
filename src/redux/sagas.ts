import { call, put, takeEvery } from 'redux-saga/effects'
import {getUserDataAPI} from "./Api";
import {GET_USER_DATA, GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, MyAction} from "./actions";

function* getUserData(action: MyAction): any {
    try {
        const user = yield call(getUserDataAPI, action.payload);
        yield put({type: GET_USER_DATA_SUCCESS, payload: user});
    } catch (ex) {
        yield put({type: GET_USER_DATA_FAILED, payload: ex.message});
    }
}

function* mySaga() {
    yield takeEvery(GET_USER_DATA, getUserData);
}

export default mySaga;