var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/haizai', (err,db)=>{
  if (err) console.log('server/mongoose/db.js ERROR: \n' ,err , '\n')
  module.exports = db;
})
