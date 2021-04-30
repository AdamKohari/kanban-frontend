import {myAction} from "./actions";

const initState = {
    currentBoardName: 'Test',
    currentBoard: {
        addedPeople: [],
        cols: {
            toDo: [],
            inProgress: [],
            done: []
        }
    },
    ownedProjects: []
};

export const kanban = (state = initState, action: myAction) => {
    const {type, payload} = action;
    switch(type) {
        default: return state;
    }
};