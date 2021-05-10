import {useContext, useEffect, useState} from "react";
import {ReactReduxContext} from "react-redux";
import {AppState} from "./reducers";

export function useStore(): [AppState, any] {
    const { store } = useContext(ReactReduxContext);
    const { getState, dispatch, subscribe } = store;

    const [ storeState, setStoreState ] = useState(getState());

    useEffect(() => subscribe(
        () => setStoreState(getState())), [getState, subscribe]);

    return [storeState, dispatch];
}