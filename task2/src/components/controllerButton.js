import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';
import { changeIsArchived } from '../redux/action';

const ControllersButton = ({ changeIsArchived, modalOpen }) => {
    const[state, setState] = useState({ state: 'true' })

    const StateTogle = (event) =>{
        setState(prev => ({ ...prev, ...{
            [event.target.name]: event.target.value
        }}))
        changeIsArchived();
    }

    const handleIsOpenChange = () => {
        modalOpen();            
    }

    return (
        <div className="nav__todo">
            <Button variant="primary" onClick={ handleIsOpenChange }>New Task</Button>{' '}
            <ButtonGroup aria-label="Basic example">
                <Button variant={ `secondary ${ state.state === 'true' ? "active" : ''}`} onClick={ StateTogle } name="state" value={true}> Active tasks </Button>
                <Button variant={ `secondary ${ state.state === 'false' ? "active" : ''}`   } onClick={ StateTogle } name="state" value={false}> Archived task </Button>
            </ButtonGroup>
        </div>
    )
}

const matchDispatchToProps = {
    changeIsArchived,
  } 
  
  
export default connect( null, matchDispatchToProps )( ControllersButton );