const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

router  
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
router
    .route('/:id')
    .get(getThoughtById)
    .delete(deleteThought)
    .put(updateThought)

module.exports = router;