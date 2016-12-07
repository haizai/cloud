var express = require('express');
var router = express.Router();
var util = require('util')
var os = require('os');

/* GET home page. */
router.get('/', function(req, res, next) {

  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);

  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        console.log(util.inspect({ifname, alias,address:iface.address, time: req._startTime},{colors: true}));
      } else {
        console.log(util.inspect({ifname, address: iface.address, time: req._startTime},{colors: true}));
      }
      ++alias;
    });
  });


  if(agentID) {
    res.redirect('/mobile')
  } else {
    res.render('index', {title:'index'});
  }
});

module.exports = router;
