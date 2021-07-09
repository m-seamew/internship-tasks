import { CREATE_TASK, CHANGE_IS_ARCHIVED, DELETE_TASK, UPDATE_TASK, UPDATE_TASK_MODAL_OPEN, UPDATE_TASK_MODAL_CLOSE, ARCHIVE_TASK, PARAM_REDACT} from "./types";

export function createTask(task) {
    return {
        type: CREATE_TASK,
        payload: task,
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        payload: id,
    }
}

export function updateTaskOpen(id) {
    return {
        type: UPDATE_TASK_MODAL_OPEN,
        payload: id,
    }
}

export function updateTaskClose() {
    return {
        type: UPDATE_TASK_MODAL_CLOSE
    }   
}

export function sendUpdatedTask(data, id){
    return {
        type: UPDATE_TASK,
        payload: {data,id},
    } 
}

export function archiveTask(id) {
    return {
        type: ARCHIVE_TASK,
        payload: id,
    }
}

export function changeParamRedact(data) {
    return {
        type: PARAM_REDACT,
        payload: data,
    }
}

export function changeIsArchived() {
    return {
        type: CHANGE_IS_ARCHIVED,
    }
}



