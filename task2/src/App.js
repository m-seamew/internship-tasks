import React from "react";
import TodoList from "./components/taskList";
import ControllerButtons from "./components/controllerButton";
import ModalForm from "./components/Modal/ModalForm";
import ModalFormRredact from './components/Modal/ModalFormRredact';
import {connect} from "react-redux"
import { useState } from 'react';


const App = ({syncOpenUI}) => {
  const [isOpen, setState] = useState(false);

  const updateIsOpen=(value)=> {
    setState(!isOpen);
  };


  return (
      <main className="main">
        <div className="main__container">

          <div className="main__table-scroll">
            <TodoList table={'main'} modalOpen={updateIsOpen} />
          </div>

          <div className="main__table-scroll">
            <TodoList table={'stat'}/>
          </div>

          <div>
            <ControllerButtons modalOpen={updateIsOpen}/>
          </div>
          { isOpen &&(<div>
            <ModalForm modalOpen={updateIsOpen}/>
          </div>) }
          { syncOpenUI &&(<ModalFormRredact/> )}


        </div>
      </main>
  );
}

const mapStateToProps = (state) =>{
  return{
      syncUpdatedEl: state.tasks.updated,
      syncOpenUI: state.tasks.isOpen,
  }
}

export default connect( mapStateToProps, null )(App);
