var apt = require('node-apt-get');
apt.options['assume-yes'] = true;
var logger=require("./logging.js");
var tls = require("tls");
var name="ahsrm321-lx01"
logger.setStream({write:function(d) {console.log(""+d)}});
var c = tls.connect({
		ca: [ fs.readFileSync("./certs/cert.pem") ],
		host:"192.168.1.5",
		port:4443 },
		function() {
	console.log("connected!");
	c.write("0:"+name);
});
c.setEncoding('utf8');