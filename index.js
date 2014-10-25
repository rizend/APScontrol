var apt = require('node-apt-get');
apt.options['assume-yes'] = true;
var logger=require("./logging.js");
var tls = require("tls");
logger.setStream({write:function(d) {console.log(""+d)}});
