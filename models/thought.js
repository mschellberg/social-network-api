const opt = { toJSON: { virtuals: true, getters: false, id: false} };
//const { Schema, model, Types } = require('mongoose');
//const reaction = require('reaction');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');


const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        ref: "User"
    },
    
    //reactions: [reactionSchema]
        /*[{type: Schema.Types.ObjectId, 
            ref: 'Reaction'
        }],*/
        
    //toJson: { virtuals: true},
    //id: false
});


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

//const Thought = model('Thought', thoughtSchema);
module.exports = mongoose.model("Thought", thoughtSchema);