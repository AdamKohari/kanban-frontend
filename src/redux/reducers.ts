import {
    GET_USER_DATA_SUCCESS,
    LOADING_END,
    LOADING_START,
    LOGIN_SUCCESS,
    LOGOUT,
    MOVE_CARD,
    MyAction,
    PROJECT_SELECTED
} from "./actions";

export type Person = {
    name: string,
    email: string
}
export type CardData = {
    title: string,
    id: string,
    user: string,
    desc: string
}
export type Project = {
    id: number,
    shortName: string,
    name: string
}
export type AppState = {
    kanban: {
        app: {
            authed: boolean,
            loading: boolean
        }
        currentBoardName: string,
        currentBoardId: number,
        currentBoard: {
            addedPeople: Person[],
            cols: {
                toDo: CardData[],
                inProgress: CardData[],
                done: CardData[]
            }
        },
        ownedProjects: Project[]
    }
}
const initState = {
    app: {
        authed: false,
        loading: false
    },
    currentBoardName: '',
    currentBoardId: 0,
    currentBoard: {
        addedPeople: [
            {name: 'Adam Kohari', email: 'asd@asd.com'},
            {name: 'Bela Kiss', email: 'ssdd@kjd.com'}
        ],
        cols: {
            toDo: [
                {title: '[BACKEND] Init', id: 'TEST-001', user: 'Adam Kohari', desc: 'Some text'},
                {title: '[BACKEND] SQL Init', id: 'TEST-002', user: 'Adam Kohari', desc: 'Some text'},
                {title: '[BACKEND] Endpoints init', id: 'TEST-003', user: 'Adam Kohari', desc: 'Some text'},
                {title: '[FRONTEND] Connect card create with Redux', id: 'TEST-004', user: 'Adam Kohari', desc: 'Some text'},
                {title: '[FRONTEND] Test', id: 'TEST-005', user: 'Adam Kohari', desc: 'Some text'}
            ],
            inProgress: [],
            done: []
        }
    },
    ownedProjects: []
};

export const kanban = (state = initState, action: MyAction) => {
    const {type, payload} = action;

    switch(type) {
        case LOADING_START: {
            return {
                ...state,
                app: {
                    ...state.app,
                    loading: true
                }
            }
        }
        case LOADING_END: {
            return {
                ...state,
                app: {
                    ...state.app,
                    loading: false
                }
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                app: {
                    ...state.app,
                    authed: true
                }
            }
        }
        case LOGOUT: {
            return {
                ...state,
                app: {
                    ...state.app,
                    authed: false
                }
            }
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                ownedProjects: payload
            }
        }
        case PROJECT_SELECTED: {
            const project = payload as Project;
            return {
              ...state,
                currentBoardName: project.name,
                currentBoardId: project.id
            };
        }
        case MOVE_CARD: {
            const sourceCol = payload.source.droppableId;
            const sourceIndex = payload.source.index;
            const destCol = payload.dest.droppableId;
            const destIndex = payload.dest.index;

            // @ts-ignore
            let sourceColCopy = state.currentBoard.cols[sourceCol].slice();
            // @ts-ignore
            let destColCopy = state.currentBoard.cols[destCol].slice();

            if (sourceCol === destCol) {
                destColCopy = sourceColCopy;
            }
            const movedCard = sourceColCopy.splice(sourceIndex, 1)[0];
            destColCopy.splice(destIndex, 0, movedCard);

            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    cols: {
                        ...state.currentBoard.cols,
                        [sourceCol]: sourceColCopy,
                        [destCol]: destColCopy
                    }
                }
            };
        }
        default: return state;
    }
};