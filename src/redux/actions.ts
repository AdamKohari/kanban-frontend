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

export const MOVE_CARD = 'MOVED_CARD';
export const movedCard = (source: any, dest: any) => ({
    type: MOVE_CARD,
    payload: {source, dest}
});
