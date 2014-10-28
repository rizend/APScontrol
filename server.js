var tls = require("tls");
var fs = require("fs");
var options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem")
};
var district={};
district.ahs={};
district.oms={};
var server = tls.createServer(options, function(c) {
	var state=0;
	var id={};
	c.setEncoding('utf8');
	c.on("data", function(d) {
		switch(state) {
		case 0:
			if(d.substr(0,2)==="0:") {
				if((d.substr(2,3)==="ahs") || (d.substr(2,3)==="oms") &&
						d.substr(5,2)==="rm" &&
						parseInt(d.substr(7,3))>99 &&
						d.substr(10,3)==="-lx" &&
						parseInt(d.substr(13,2))>0) {
					id.full=d.substr(2,13);
					id.school=id.full.substr(2,3);
					id.room=parseInt(id.full.substr(7,3));
					id.number=parseInt(id.full.substr(13,2));
					if(typeof(district["rm"+id.room])==="undefined") {
						district["rm"+id.room]={};
					}
					district[id.school]["rm"+id.room]["lx"+id.number]={id:id, c:c, loggedin:undefined};
				}
				state=1;
			} else {
				c.end();
			}
			break;
		case 1:
			
		default:
			throw "error:? invalid data";
		}
	});
});
server.listen(4443);
