const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    default: '1234'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;