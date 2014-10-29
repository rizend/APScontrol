var tls = require("tls");
var fs = require("fs");
var options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem")
};
var server = tls.createServer(options, function(c) {
	var state=0;
	var id={};
	c.setEncoding('utf8');
	c.on("end", function() {
		console.log("end during state "+state);
	});
	c.on("data", function(d) {
		//console.log("data during state "+state+":"+d)
		switch(state) {
		case 0:
			if(d.substr(0,2)==="0:") {
				if((d.substr(2,3)==="ahs") || (d.substr(2,3)==="oms") &&
						d.substr(5,2)==="rm" &&
						parseInt(d.substr(7,3))>99 &&
						d.substr(10,3)==="-lx" &&
						parseInt(d.substr(13,2))>0) {
					id.full=d.substr(2,13);
					id.school=id.full.substr(0,3);
					id.room=parseInt(id.full.substr(5,3));
					id.number=parseInt(id.full.substr(11,2));
					console.log("got id:"+JSON.stringify(id));
					state=1;
					c.write("ctouch /RV/a")
				}
				else
				{
					c.end();
				}
			} else {
				c.end();
			}
			break;
		case 1:
			console.log(id.full+":"+d);
			break;
		default:
			throw "error:? invalid data";
		}
	});
});
server.listen(4443);
