import React from 'react';
import returnDates from './function/returnDates';
import { connect } from 'react-redux';
import { deleteTask, updateTaskOpen, archiveTask } from '../redux/action';

const renderReturnedDates = ( arrMatches ) => {
    return arrMatches.length > 0
              ? arrMatches.map( ( el, index ) => <div key={ index }> { el } </div> )
              : '-';
}

const returnCathegoryImg = ( cathegory, cathegoriesLinks ) => {
    let img = cathegoriesLinks.default;
    Object.keys( cathegoriesLinks ).forEach( e => e === cathegory ? img = cathegoriesLinks[e] : null);
    const result = <div className="todo__icon">
                        <img className="icon--vertical-middle todo__icon--header" src={img} alt="cathegory img" />
                   </div>
    return result;
    
}

const redactingFunc = (id, deleteTask, updateTaskOpen, archiveTask) => {
    updateTaskOpen(id);
}

const deleteFunc = (id, deleteTask, updateTaskOpen, archiveTask) => {
    deleteTask(id);
}

const archiveFunc = (id, deleteTask, updateTaskOpen, archiveTask) => {
    archiveTask(id);
}

const arrButtonsFunc = [
    redactingFunc,
    deleteFunc,
    archiveFunc,
]
const returnButtons = (syncIcon, isArchived, id, deleteTask, updateTaskOpen, archiveTask) => {
    const parametrArchive = isArchived ? 'toArchive' : 'fromArchive';
    const result = [];
    syncIcon.filter( el => Object.keys(el)[0] !== parametrArchive ).forEach( (el,index)=> {
        const img = Object.values(el)[0];
        const headers = 
            <td key={result.length}>
                <div className="todo__icon" onClick={ () => arrButtonsFunc[index](id, deleteTask, updateTaskOpen, archiveTask) }>
                    <img className="icon--vertical-middle todo__icon--header" src={img} alt="img"/>
                </div>
            </td>
        result.push(headers);
    });
    return result;
}

const TaskItem = ({syncCathegories, syncIcon, syncIsArchived,  deleteTask,
    updateTaskOpen,
    archiveTask, task, paramTable, openPopup}) => {

        if(paramTable === 'main'){
            if(syncIsArchived === task.archived){
                return (
                    <tr>
                        <td>{returnCathegoryImg(task.cathegory, syncCathegories)}</td>
                        <td>{task.taskName}</td>
                        <td>{task.createdTitle}</td>
                        <td>{task.cathegory}</td>
                        <td className="todo__content-conteiner">
                            <div className="todo__content todo__content--small">
                                { task.content }
                            </div>
                        </td>
                        <td>{ renderReturnedDates( returnDates(task.content) ) }</td>
                        {returnButtons(syncIcon, syncIsArchived, task.id, deleteTask, updateTaskOpen, archiveTask, openPopup)}
                    </tr>
                )
            }else{
                return <tr/>;
            }
        }else if(paramTable === 'stat'){
            return(
                <tr>
                    <td>{returnCathegoryImg(Object.keys(task)[0], syncCathegories)}</td>
                    <td>{Object.keys(task)[0]}</td>
                    <td>{task[Object.keys(task)[0]].active}</td>
                    <td>{task[Object.keys(task)[0]].archived}</td>
                </tr>
            )
        }
}

const mapStateToProps = (state) =>{
    return{
        syncCathegories: state.table.cathegories,
        syncIcon: state.table.icons,
        syncIsArchived: state.table.isArchived,
    }
}

const matchDispatchToProps = {
    deleteTask,
    updateTaskOpen,
    archiveTask
  } 

export default connect(mapStateToProps, matchDispatchToProps)(TaskItem);