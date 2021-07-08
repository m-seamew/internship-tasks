const { Router } = require('express');
const controller = require('../services/controllerNotes');
const router = Router();

const validateBody = require('../services/middleware/validateBody');
const bodySchema = require('../services/middleware/validateSchema');
const validateParam = require('../services/middleware/validateParam');



// DELETE
router.delete( '/:id', validateParam(1, 0, ['int']), controller.deleteOne);
 
// POST
router.post('/', validateBody(bodySchema.Create), controller.createNote);

// PATCH
router.patch('/:id', validateBody(bodySchema.Update), controller.updateNote);

// GET
router.get('/stats', validateParam(0, 0), controller.getStat);
router.get('/:id', validateParam(1, 0, ['int']), controller.getOne);
router.get('/', validateParam(0, 0), controller.getAll);
router.get('*', (req, res) => {
    res.status(404).json({message: 'resource not found'})
});

module.exports = router;