import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {kanban} from "./reducers";

const reducers = {
    kanban
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools()
    )
}