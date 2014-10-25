var net = require("net");
var fs = require("fs");
try {
	fs.unlinkSync("./log.socket")
} catch(e) {
	//oh no, the socket was already cleaned.
}
function setStream(log) {
	var notesServer = net.createServer(function(c) { //'connection' listener
		c.on("data", function(d) {
			log.write(d);
		});
		//c.pipe(c);
	});
	notesServer.listen("./log.socket", function() { //'listening' listener
		console.log('server bound');
	});
}
exports.setStream=setStream;