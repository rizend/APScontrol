var tls = require("tls");
var fs = require("fs");
var options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem")
};
var server = tls.createServer(options, function(c) {
	
});