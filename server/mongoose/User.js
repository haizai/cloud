var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var userSchma = new mongoose.Schema({
  uid: Number, 
  account: String,
  password: String,
  registerTime: { type: Date, default: Date.now() },
  sign: { type: String, default: '' },
  position: { type: String,default: 'member' }
  position: { type: String,default: 'member' }, // admin
  msg: {
    sex: {type: String, default: 'secret'}, // male female other
  }
});

var User = mongoose.model('User', userSchma);

module.exports = User