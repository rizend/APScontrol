var net = require("net");
var fs = require("fs");
fs.unlinkSync("./log.socket")
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
setStream({write:function(d) {console.log(""+d)}});
exports.setStream=setStream;