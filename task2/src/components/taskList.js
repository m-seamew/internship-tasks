import React from "react";
import TaskItem from "./taskItem";
import {connect} from "react-redux"
import { Table } from 'react-bootstrap';
import { PropTypes } from "prop-types";
import returnStat from "./function/returnStat";


const checkTableHeader = (syncTable, syncIcon, table, ) => {
    let result = [];

    if(table === 'main'){
        result = syncTable.main.map( (el, index) => {
            return <td key={index}>{el}</td>
        })
        
        syncIcon.filter(el => Object.keys(el)[0] !== 'fromArchive').forEach( (el,index)=> {
            const img = Object.values(el)[0];
            const headers = 
                <td key={result.length}>
                    <div className="todo__icon todo__icon--update">
                        <img className="icon--vertical-middle todo__icon--header" src={img} alt="img"/>
                    </div>
                </td>
            result.push(headers);
        });

    } else if (table === 'stat'){
        result = syncTable.stat.map( (el, index) => {
            return <td key={index}>{el}</td>
        })
    }
    return result;
}

const loadStat = (tasks, cathegories) => {
    const arr = returnStat(tasks, cathegories);
    return loadTask(arr, 'stat');
}

const loadTask = (tasks, tableType, updateisOpen) => {
    let result = [];
    tasks.forEach( (el, index) => {
            result.push( <TaskItem task={el} key={index} paramTable={tableType} />)          
    })
    return result;
}




const TaskList = ({ syncTasks, syncTable, syncIcon, syncCathegories, table, syncisOpenRedacting }) =>{
    
    return (
        <div>
        <Table striped bordered hover >
            <thead> 
                <tr>
                    { checkTableHeader(syncTable, syncIcon, table) }       
                </tr>
            </thead>
            <tbody>
                    { table === 'main' ? loadTask(syncTasks, 'main') : loadStat(syncTasks, syncCathegories) }
            </tbody> 
        </Table>
        </div>
    )
}

TaskList.propsType = {
    table: PropTypes.string.required,
}

const mapStateToProps = (state) =>{
    return{
        syncTasks: state.tasks.tasks,
        syncTable: state.table,
        syncIcon: state.table.icons,
        syncCathegories: state.table.cathegories,
        syncisOpenRedacting: state.tasks.isOpen,
    }
}

export default connect(mapStateToProps, null)(TaskList);