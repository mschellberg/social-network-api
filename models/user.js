const opt = { toJSON: { virtuals: true, getters: false, id: false} };
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    ] 
  },
  thoughts: // one to many relationship
    [{type: Schema.Types.ObjectId,
      ref: 'Thought'
  }], 
  friends: // one to many relationship
    [{type: Schema.Types.ObjectId, 
      ref: 'User'
    }], 
  /*
  toJSON: {
    virtuals: true,
    getters: true 
  },
  id: false
  */
});
const User = model('User', userSchema);
// creates virtual to retrieve length of users friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


module.exports = User;