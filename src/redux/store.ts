import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {kanban} from "./reducers";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

const reducers = {
    kanban
};

const rootReducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    )
}

export const runSaga = () => sagaMiddleware.run(mySaga);