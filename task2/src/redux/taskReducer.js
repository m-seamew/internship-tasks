import { CREATE_TASK, DELETE_TASK, ARCHIVE_TASK, UPDATE_TASK, UPDATE_TASK_MODAL_OPEN, UPDATE_TASK_MODAL_CLOSE  } from "./types";

const initialState = {
    tasks: [
        {
            id: 1,
            taskName: "Shoping list",
            created: "Sun Jul 04 2021 20:38:54 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Task",
            content: "Tomatoes, bread",
            archived: false
        },
        {
            id: 2,
            taskName: "The theory of evolution",
            created: "Sun Jul 04 2021 20:39:45 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Random Thought",
            content: "The evolution...",
            archived: false
        },
        {
            id: 3,
            taskName: "New feature",
            created: "Sun Jul 04 2021 20:41:17 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Idea",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet porttitor metus, et aliquet arcu faucibus vitae. Maecenas vitae nisi ut leo vulputate convallis. Vivamus metus purus, semper sed neque eu, fringilla pulvinar turpis. ",
            archived: true,
        },
        {
            id: 4,
            taskName: "Visit the doctor",
            created: "Sun Jul 04 2021 20:42:56 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Task",
            content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
            archived: false,
        },
        {
            id: 5,
            taskName: "StartUp idea presentation",
            created: "Sun Jul 04 2021 20:44:51 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Idea",
            content: "deadline for application - 4.08.2021",
            archived: false
        },
        {
            id: 6,
            taskName: "Go to the cinema",
            created: "Sun Jul 04 2021 20:46:19 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Task",
            content: "Starting at 15:00",
            archived: true
        },
        {
            id: 7,
            taskName: "Answer to emails",
            created: "Sun Jul 04 2021 20:47:18 GMT+0200 (Восточная Европа, стандартное время)",
            createdTitle: "Jul 4, 2021",
            cathegory: "Task",
            content: "",
            archived: false
        }
    ],
    updated: [],
    isOpen: false,
}

export const taskReducer = (state = initialState, action) =>{
    switch(action.type){
        case CREATE_TASK:
            return { ...state, tasks: state.tasks.concat([action.payload]) }
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter( el => el.id !== action.payload) }
        case ARCHIVE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(item=>{
                     if(item.id === action.payload){
                         return {
                             ...item,
                             archived: !item.archived
                         }
                     }else{
                        return item
                     }
            })}
        case UPDATE_TASK_MODAL_OPEN:
             return { ...state, updated: state.tasks.filter( el => el.id === action.payload), isOpen:true }
        case UPDATE_TASK_MODAL_CLOSE:
            return { ...state, updated: [], isOpen:false }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(item=>{
                     if(item.id === action.payload.id){
                         return {
                             ...item,
                             ...action.payload.data
                         }
                     }else{
                        return item
                     }
            })}
        default: return state;
    }
}