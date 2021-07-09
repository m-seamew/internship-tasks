import { CHANGE_IS_ARCHIVED } from "./types";

const initialState = {
    main: ['', 'Name', 'Created', 'Cathegory', 'Content', 'Dates'],
    stat: ['', 'Cathegory', 'Active', 'Archived'],
    icons:[
        {redaction: '/img/pencil.svg'},
        {delete: '../img/delete.svg'},
        {toArchive: '../img/download-button.svg'},
        {fromArchive: '../img/reply.svg'}
    ],
    cathegories: {
        'Task': '/img/cathegories/task.svg',
        'Random Thought': '/img/cathegories/thinking.svg',
        'Idea': '/img/cathegories/lamp.svg',
        'default': '/img/cathegories/task.svg',
    },
    isArchived: false,
}

export const tableReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_IS_ARCHIVED:
            return { ...state, isArchived: !state.isArchived}
        default: return state;
    }
}