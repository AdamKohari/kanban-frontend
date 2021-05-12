import {CardData, Person, Project} from "./reducers";
import {toast, ToastOptions} from "react-toastify";
import {ProjectData} from "./Api";

export type MyAction = {
    type: string,
    payload: any
}

// UNIVERSAL ACTIONS ////////////////////////////
export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const displayMessage = (text: string, options: ToastOptions) => {
    toast(text, options);
    return {
        type: DISPLAY_MESSAGE
    };
}

export const LOADING_START = 'LOADING_START';
export const loadingStart = () => ({
    type: LOADING_START
})
export const LOADING_END = 'LOADING_END';
export const loadingEnd = () => ({
    type: LOADING_END
})
////////////////////////////////////////////////




// ACCOUNT ACTIONS /////////////////////////////
export const LOGIN = 'LOGIN';
export const login = (email: string, password: string) => ({
    type: LOGIN,
    payload: {email, password}
});
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT
});

export const REGISTER = 'REGISTER';
export const register = (email: string, fullName: string, password: string) => ({
    type: REGISTER,
    payload: {email, fullName, password}
});
////////////////////////////////////////////////




// MANAGER ACTIONS /////////////////////////////
export const PROJECT_SELECTED = 'PROJECT_SELECTED';
export const projectSelected = (project: Project) => ({
    type: PROJECT_SELECTED,
    payload: project
});

export const GET_USER_DATA = 'GET_USER_DATA';
export const getUserData = () => ({
    type: GET_USER_DATA
});
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const createProject = (projectData: ProjectData) => ({
    type: CREATE_PROJECT,
    payload: projectData
});

export const INSPECT_PROJECT = 'INSPECT_PROJECT';
export const inspectProject = (projectId: string) => ({
    type: INSPECT_PROJECT,
    payload: projectId
});
////////////////////////////////////////////////




// BOARD ACTIONS ///////////////////////////////
export const GET_BOARD = 'GET_BOARD';
export const getBoard = (projectId: string) => ({
    type: GET_BOARD,
    payload: projectId
});
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';

export const CREATE_CARD = 'CREATE_CARD';
export const createCard = (cardData: CardData, projectId: string, notifiedPeople: Person[]) => ({
    type: CREATE_CARD,
    payload: {...cardData, projectId, notifiedPeople}
});

export const MOVE_CARD = 'MOVED_CARD';
export const movedCard = (source: any, dest: any) => ({
    type: MOVE_CARD,
    payload: {source, dest}
});