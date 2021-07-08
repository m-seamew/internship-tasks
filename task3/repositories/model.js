const database = require('../database');

const returnAll = () => database;
const returnOne = ( id ) => database.find( el => el.id === id );
const addNewNote = ( element ) => {
    database.push( element );
    return database;
}

const deleteNote = ( id ) => {
    const index = database.findIndex( el => el.id === id )
    if( index != -1 ){
        database.splice( index, 1 );
        return { status: true, data: database };
    } else {
        return { status: false, data: database };
    }
};

const addUpdatesToNote = ( id, updates ) => {
    
    let note = database.find( el => el.id === id );
    if( note !== undefined ){
        note = { ...note, ...updates };
        return { status: true, data: note };
    } else {
        return { status: false };
    }
    
}

module.exports = {
    returnAll,
    returnOne,
    addNewNote,
    deleteNote,
    addUpdatesToNote,
}


 