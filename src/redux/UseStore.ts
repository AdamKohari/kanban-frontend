import {useContext, useEffect, useState} from "react";
import {ReactReduxContext} from "react-redux";

export function useStore() {
    const { store } = useContext(ReactReduxContext);
    const { getState, dispatch, subscribe } = store;

    const [ storeState, setStoreState ] = useState(getState());

    useEffect(() => subscribe(
        () => setStoreState(getState())), [getState, subscribe]);

    return [storeState, dispatch];
}