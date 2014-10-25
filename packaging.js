var apt = require('node-apt-get');
//install and update packages
var todo=[];
var todocounter=0;
var running=false;
apt.options['assume-yes'] = true;
exports.install=function(package) {
	todo[todo.length]=package;
	if(!running) {
		main();
	}
}
exports.upgrade=function() {
	todo[todo.length]="upgrade";
	if(!running) {
		main();
	}
}
exports.update=function() {
	todo[todo.length]="update";
	if(!running) {
		main();
	}
}
exports.getTodo=function() {
	return {list:todo,counter:todocounter};
}
function main() {
	if(todo.length>=todocounter) {
		todocounter++;
		switch(todo[todocounter-1]) {
		case "upgrade":
			apt.upgrade().on('close', function() {
				main();
			});
			break;
		case "update":
			apt.update().on('close', function() {
				main();
			});
			break;
		default://install package named
			apt.install(todo[todocounter-1]).on("close", function(code) {
				if (code !== 0) return console.error(todo[todocounter-1]+" not installed");
				else console.log(todo[todocounter-1]+"");
				main();
			});
		}
	} else {
		running=false;
	}
}