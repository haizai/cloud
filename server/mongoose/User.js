var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var userSchma = new mongoose.Schema({
  uid: Number, 
  account: String,
  password: String,
  registerTime: { type: Date, default: Date.now() },
  sign: { type: String, default: '' },
  position: { type: String,default: 'member' }, // admin
  msg: {
    sex: {type: String, default: 'secret'}, // male female other
    proID: {type: Number, default: 0},
    cityID: {type: Number}
  },
  record: {type: Array, default: []},
  face: {
    style: {type:String, default: 'boy'}, // boy girl
    name: {type:Number,  default: 1}, // e.g 1
  }
});

var User = mongoose.model('User', userSchma);

module.exports = User