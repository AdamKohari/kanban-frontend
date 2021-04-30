import {Project} from "./reducers";

export type myAction = {
    type: string,
    payload: any
}

export const PROJECT_SELECTED = 'PROJECT_SELECTED';
export const projectSelected = (project: Project) => ({
    type: PROJECT_SELECTED,
    payload: project
});
