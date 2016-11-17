var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID){
    console.log('mobile', deviceAgent)
    res.redirect('/mobile')
  }else{
    console.log('px', deviceAgent)
   res.render('index', {title:'index'});
  }
});

module.exports = router;
