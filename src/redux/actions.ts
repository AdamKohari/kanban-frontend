import {Project} from "./reducers";
import {toast, ToastOptions} from "react-toastify";
import {ProjectData} from "./Api";

export type MyAction = {
    type: string,
    payload: any
}

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

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const createProject = (projectData: ProjectData) => ({
   type: CREATE_PROJECT,
   payload: projectData
});