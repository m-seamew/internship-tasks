import Model from './model.js';
import View from './view.js';

export default class Controller{
    constructor(){
        this.model = new Model(); 
        this.view = new View();

        this.view.render(this.model.data, this.model.isArchived, this.calcStat, this.model.cathegories);

        this.view.addEventListener(
            this.callbackForClosePopup,
            this.archivedStatusChange,
            this.openTaskPopup,
        );

        this.view.addDynamicEventListener(
            this.deleteTask,
            this.changeArchivedStatusOfTask,
            this.openTaskPopupUpd, 
        )
        
    }

    editedTaskTarget;

    reRender = () => {
        this.view.render(this.model.data, this.model.isArchived, this.calcStat, this.model.cathegories);
        this.view.addDynamicEventListener(this.deleteTask, this.changeArchivedStatusOfTask, this.openTaskPopupUpd,);
    }

    addTask = () => {
        const result = this.model.addTask(this.model.data, this.model.inputs, this.callbackForClosePopup);
        !result ? this.view.addEventListenerForNewTaskSave(this.addTask, this.model.inputs) : null;
        this.reRender();
    }

    deleteTask = (e) => {
        this.model.deleteTask(this.model.data, e);
        this.reRender();
    }

    updateTask = () => {
        const result = this.model.updateTask(this.model.data, this.model.inputs, this.callbackForClosePopup, this.editedTaskTarget);
        !result ? this.view.addEventListenerForUpdateTask(this.updateTask, this.model.inputs) : null;
        this.reRender();
    }

    changeArchivedStatusOfTask = (e) => {
        this.model.changeArchivedStatusOfTask(this.model.data, e);
        this.reRender();
    }

    callbackForClosePopup = () => {
        this.view.closeTaskPopup(this.model.inputs);
    }

    openTaskPopup = () =>{
        this.view.openTaskPopup(this.model.inputs);
        this.view.addEventListenerForNewTaskSave(this.addTask, this.model.inputs);
    }

    openTaskPopupUpd = (e) => {
        this.editedTaskTarget = e;
        this.view.openTaskPopupUpd(this.model.inputs, this.model.data, e);
        this.view.addEventListenerForUpdateTask(this.updateTask, this.model.inputs);
    }

    archivedStatusChange = (e) => {
        this.model.changeArchivedStatus(this.model.setIsArchived, e);
        this.reRender();
    }

    calcStat = () => {
        return this.model.calcStat(this.model.data, this.model.cathegories);
    }

}