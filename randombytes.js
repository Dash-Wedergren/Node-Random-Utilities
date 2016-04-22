const fs = require('fs');
const Readable = require('stream').Readable;
const crypto = require("crypto");
process.stdin.setEncoding('utf8');
var rs = Readable();
var num;
var buffer;
var hash = crypto.createHash("sha1");
process.stdin.on('readable', function(){	
	var chunk = process.stdin.read();
	if(chunk !== null){
		var random = fs.createReadStream('/dev/urandom', {"start": 0, "end": parseInt(chunk)});
		random.on('data',function(d){
			d = d.toString('hex');
			d = d.slice(0,chunk);
			console.log(d);
		})
	}
});