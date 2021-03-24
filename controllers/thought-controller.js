const Thought = require('../models/thought');

const thoughtController  = {
    // retrieve all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },
    // create thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // retrieve thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'user',
            select: '-__v'
        })
        
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });  
    },
    deleteThought ({ params }, res) { // DELETE ISNT WORKING, COME BACK TO IT
        Thought.findOneAndDelete({ id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;