var apt = require('node-apt-get');
var fs = require("fs");
apt.options['assume-yes'] = true;
var logger=require("./logging.js");
var tls = require("tls");
var exec = require("child_process").exec;
function main() {
	fs.readFile("/etc/hostname", function(err, data) {
		if(err)
			throw err;
		else
			connect((""+data).trim());
	});
}
function connect(name) {
	var c = tls.connect({
			ca: [ fs.readFileSync("./certs/cert.pem") ],
			host:"local.goxht.ml",//use puppet. when in production
			port:4443 },
			function() {
		console.log("connected!");
		c.write("0:"+name);
		logger.setStream(c);
	});
	c.on("end", function(a) {
		console.log("wah, disconnected!");
		var t = setTimeout(function() {
			main();
		},8192);
	});
	c.on("error", function(e) {
		console.log("Wah, connection failed!");
		var t = setTimeout(function() {
			main();
		},8192);
	});
	c.setEncoding('utf8');
	c.on("data", function(d) {
		switch(d.substr(0,1)) {
		case "e":
			eval(d.substr(1));
			break;
		case "c":
			exec(d.substr(1), function(err, stdout, stderr) {
				//c.write("stdout:[["+stdout+"]]");
				//c.write("stderr:[["+stderr+"]]");
			});
			break;
		}
	});
}
main();
