import React from "react";
import './modal.scss'
import { Form } from "react-bootstrap";
import { useState } from 'react';
import { connect } from "react-redux";
import { createTask, updateTaskClose, sendUpdatedTask } from '../../redux/action';
import { Button } from "react-bootstrap";

const ModalFormRedact = ({ syncUpdatedEl,syncOpenUI, updateTaskClose, sendUpdatedTask }) => {

    const handleIsOpenChange = () => {
      updateTaskClose();
    }

    const [task, setState] = useState(
        {
        taskName: syncUpdatedEl && syncUpdatedEl[0] ? syncUpdatedEl[0].taskName : '',
        cathegories: ['Task', 'Random Thought', 'Idea'],
        content: syncUpdatedEl && syncUpdatedEl[0] ? syncUpdatedEl[0].content: '',
        cathegory: syncUpdatedEl && syncUpdatedEl[0] ? syncUpdatedEl[0].cathegory: '',
        } 
    );
    const Add = task.cathegories.map( el => el);

    const changeInputHandler = event => {
      event.persist();
      setState(prev => ({ ...prev, ...{
        [event.target.name]: event.target.value
      }}))
    }

    const changeInputSelect = (e) => task[e.target.name] = e.target.value;
    const inputSelectIndex = () => Add.indexOf( task.cathegory ) !== -1 ? Add.indexOf( task.cathegory ) : 0;
    
    const createUpdates = () => {
      const newTask = {
        taskName: task.taskName,
        cathegory: task.cathegory,
        content: task.content,
      }

    sendUpdatedTask( newTask, syncUpdatedEl[0].id );
    handleIsOpenChange();
    }
    
    return(
      <div className="modal">
        <div className="modal__body">
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" name='taskName' value={task.taskName} onChange={ changeInputHandler }/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Cathegory</Form.Label>
            <Form.Control as="select" name='cathegory'
                          onChange={ changeInputSelect }
                          defaultValue={ task.cathegories[inputSelectIndex()] }
             >
              {
                 Add.map((el, index) => <option key={ index } value={ el }> { el } </option>)
              }
            </Form.Control>

          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} name='content' value={task.content} onChange={changeInputHandler}/>
            <div className="modal__controllers-cont">
              <Button className="modal__btn" variant="success" onClick={ createUpdates }>Update task</Button>{' '}
              <Button className="modal__btn" variant="danger" onClick={ handleIsOpenChange }>Cancel</Button>{' '}
            </div>
          
          </Form.Group>
        </Form>
        </div>
      </div>
    )
    
}

const matchDispatchToProps = {
  createTask,
  updateTaskClose,
  sendUpdatedTask,
} 

const mapStateToProps = ( state ) =>{
  return{
      syncUpdatedEl: state.tasks.updated,
      syncOpenUI: state.tasks.isOpen,
  }
}

export default connect( mapStateToProps, matchDispatchToProps )(ModalFormRedact);