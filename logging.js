var net = require("net");
var fs = require("fs");
function setStream(log) {
	try {
		fs.unlinkSync("./log.socket")
	} catch(e) {
		//oh no, the socket was already cleaned.
	}
	var notesServer = net.createServer(function(c) { //'connection' listener
		c.pipe(log, {end:false});
	});
	notesServer.listen("./log.socket", function() { //'listening' listener
		console.log('server bound');
	});
}
exports.setStream=setStream;
