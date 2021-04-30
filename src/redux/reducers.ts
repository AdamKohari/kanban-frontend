import {myAction, PROJECT_SELECTED} from "./actions";

export type Person = {
    name: string,
    email: string
}
export type Card = {
    title: string,
    id: string,
    user: string
}
export type Project = {
    id: number,
    shortName: string,
    name: string
}
export type AppState = {
    kanban: {
        currentBoardName: string,
        currentBoardId: number,
        currentBoard: {
            addedPeople: Person[],
            cols: {
                todo: Card[],
                inProgress: Card[],
                done: Card[]
            }
        },
        ownedProjects: Project[]
    }
}
const initState = {
    currentBoardName: '',
    currentBoardId: 0,
    currentBoard: {
        addedPeople: [
            {name: 'Adam Kohari', email: 'asd@asd.com'},
            {name: 'Bela Kiss', email: 'ssdd@kjd.com'}
        ],
        cols: {
            toDo: [{title: 'Example Card', id: 'TEST-001', user: 'Adam Kohari'}],
            inProgress: [],
            done: []
        }
    },
    ownedProjects: [
        {id: 0, shortName: 'kanbanment', name: 'Kanban Board Mentoring Project'},
        {id: 1, shortName: 'trackyou', name: 'Tracking Mobile WebApp'}
    ]
};

export const kanban = (state = initState, action: myAction) => {
    const {type, payload} = action;

    switch(type) {
        case PROJECT_SELECTED: {
            const project = payload as Project;
            return {
              ...state,
                currentBoardName: project.name,
                currentBoardId: project.id
            };
        }
        default: return state;
    }
};