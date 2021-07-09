import { combineReducers } from "redux"
import { tableReducer } from "./tableReducer"
import { taskReducer } from "./taskReducer"

export const rootReducer = combineReducers({
    tasks: taskReducer,
    table: tableReducer,
})

