var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var userSchma = new mongoose.Schema({
  uid: Number,
  account: String,
  password: String,
  name: String,
  sign: { type: String, default: '' },
})

var User = mongoose.model('User', userSchma)

User.remove({}).exec((err,doc)=>{
  // 默认用户
  var user = new User({
    uid: 0,
    account: 'admin',
    password: 'admin123',
    name: 'admin name'
  })
  user.save()
})


module.exports = User 