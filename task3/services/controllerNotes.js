const { returnAll, returnOne, addNewNote, deleteNote, addUpdatesToNote } = require('../repositories/model.js');
const { Note } = require('./note.js');
const returnStat = require('./stat.js');


const controller = {

    getAll : ( req, res ) => {
        try {
            const notes = returnAll();
            res.status(200).json( notes );
          } catch( error ) {
            res.status(500).json({ message: `${error}` });
          }
    },

    getOne : ( req, res ) => {
        try {
            const note = returnOne( +req.params.id );
            note
            ? res.status(200).json( note )
            : res.status(404).json({ message: 'note did not found' });
          } catch( error ) {
            res.status(500).json({ message: `${error}` });
          }
    },

    deleteOne : ( req, res ) => {
        try {
            const notes = deleteNote( +req.params.id );
            notes.status 
            ? res.status(200).json( notes.data )
            : res.status(404).json({ message: 'note did not found' });
        } catch (error) {
            res.status(500).json({ message: `${error}` });
        }
    },

    updateNote : ( req, res ) => {
        try{
            const update = req.body; 
            const note = addUpdatesToNote( +req.params.id, update );
            note.status 
            ? res.status(200).json( note.data )
            : res.status(404).json({ message: 'note did not found' });
        } catch (error){
            res.status(500).json({ message: `${error}` });
        }
    },

    createNote : (req, res) => {
        try{
            const data = req.body; 
            const datalist = returnAll();
            const id = datalist[datalist.length-1].id + 1;
            const newNote = new Note( id, data.taskName, data.created, data.athegory, data.content );
            const notes = addNewNote( newNote );
            res.status(200).json( notes )
        } catch (error){
            res.status(500).json({ message: `${error}` });
        }
    },

    getStat: ( req, res ) => {
        try{
            const stat = returnStat( returnAll );
            res.status(200).json( stat )
        } catch ( error ){
            res.status(500).json({ message: `${error}` });
        }
    }


}

module.exports = controller;