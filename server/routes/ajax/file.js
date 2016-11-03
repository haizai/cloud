var formidable = require('formidable') 
var fs = require('fs')
var util = require('util');
var path = require('path')

var password = require(path.resolve(__dirname, '..', '..', '..', 'my/password.js'))
var express = require('express');
var router = express.Router();

router.post('/file', (req, res) => {

	if (req.query.password != password) {
		res.send('error! \n\n password false')
		return
	}

	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.keepExtensions = true;
	form.uploadDir = path.resolve(__dirname,'..','..','..','upload/')

	form.parse(req, (err, fields, files) => {
		if (!files.file || files.file.size === 0) {
			res.send('error! \n\n no file')
		  return
		}
    var dir = path.normalize(files.file.path)
    fs.exists(dir, exists=>{
    	if (exists)
   		fs.rename(dir, path.join(path.dirname(dir), files.file.name))
    })
    res.send('success! \n\n'+util.inspect({fields, files}))
  });
	return

})
module.exports = router;
