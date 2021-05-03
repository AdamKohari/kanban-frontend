import {Project} from "./reducers";

export type MyAction = {
    type: string,
    payload: any
}

export const PROJECT_SELECTED = 'PROJECT_SELECTED';
export const projectSelected = (project: Project) => ({
    type: PROJECT_SELECTED,
    payload: project
});

export const MOVE_CARD = 'MOVED_CARD';
export const movedCard = (source: any, dest: any) => ({
    type: MOVE_CARD,
    payload: {source, dest}
});

export const GET_USER_DATA = 'GET_USER_DATA';
export const getUserData = () => ({
    type: GET_USER_DATA
});

export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';