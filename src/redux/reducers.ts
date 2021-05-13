import {
    GET_BOARD_SUCCESS, GET_USER_DATA_SUCCESS, INSPECT_PROJECT, LOADING_END, LOADING_START,
    LOGIN_SUCCESS, LOGOUT, MOVE_CARD, MyAction, PROJECT_SELECTED
} from "./actions";


// TYPES
export type Person = {
    userId: string,
    fullName: string,
    email: string
}
export type CardData = {
    title: string,
    id: string,
    user: string,
    desc: string
}
export type Project = {
    id: string,
    shortName: string,
    name: string,
    addedPeople: Person[]
}
export type AppState = {
    kanban: {
        app: {
            authed: boolean,
            loading: boolean
        },
        currentBoardName: string,
        currentBoardShortName: string,
        currentBoardId: string,
        currentBoard: {
            addedPeople: Person[],
            cols: {
                toDo: CardData[],
                inProgress: CardData[],
                done: CardData[]
            }
        },
        ownedProjects: Project[],
        inspectedProjectId: string
    }
}


// INIT STATE
const initState = {
    app: {
        authed: false,
        loading: false
    },
    currentBoardName: '',
    currentBoardShortName: '',
    currentBoardId: '',
    currentBoard: {
        addedPeople: [],
        cols: {
            toDo: [],
            inProgress: [],
            done: []
        }
    },
    ownedProjects: [],
    inspectedProjectId: ''
};


// REDUCER
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
                ...initState
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
                currentBoardShortName: project.shortName,
                currentBoardId: project.id,
                currentBoard: {
                  ...state.currentBoard,
                    addedPeople: project.addedPeople
                }
            };
        }
        case MOVE_CARD: {
            const sourceCol: ('toDo' | 'inProgress' | 'done') = payload.source.droppableId;
            const sourceIndex = payload.source.index;
            const destCol: ('toDo' | 'inProgress' | 'done') = payload.dest?.droppableId;
            const destIndex = payload.dest?.index;

            if (!destCol || !destIndex) return state;

            let sourceColCopy = state.currentBoard.cols[sourceCol].slice();
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
        case GET_BOARD_SUCCESS: {
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    cols: {
                        toDo: payload.toDo,
                        inProgress: payload.inProgress,
                        done: payload.done
                    }
                }
            }
        }
        case INSPECT_PROJECT: {
            return {
                ...state,
                inspectedProjectId: payload
            }
        }
        default: return state;
    }
};