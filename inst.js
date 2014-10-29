var service = require("service-manager");
var svc = new service.Service({
	name:"APScontrol",
	description:"APScontrol daemon",
	run:"nodejs",
	args:["/RV/APScontrol/index.js"],
});
console.log(svc.installSync() ? "installed!" : "not installed :(");
