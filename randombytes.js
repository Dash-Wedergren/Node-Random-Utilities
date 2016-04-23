const fs = require('fs');
var num;
var accepted_codpoints = [5,97,66,98,67,99,68,100,69,101,70,102,71,103,72,104,73,105,74,106,75,107,76,108,77,109,78,110,79,111,80,112,81,113,82,114,83,115,84,116,85,117,86,118,87,119,88,120,89,121,90,122,126,96,33,64,35,36,37,94,38,42,40,41,95,45,43,61,123,91,125,93,124,58,59,39,60,44,62,46,63,47,32,34];

if(process.argv[2] && isNaN(process.argv[2]) !== true){
	var chunk = parseInt(process.argv[2]);
}else{
	console.error("Specify a number for the length of your password");
}

if(chunk && typeof chunk == "number"){
	var random = fs.createReadStream('/dev/urandom', {"start": 0, "end": parseInt(chunk * 3)});
	random.on('data', function(d){
		var password = "";
		d = d.toString('hex').replace(/[^0-9]/gim,"");
		//console.log(d.length + ": " + d);
		var previous = 0;
		for(i=0;i<Math.floor(d.length/2);i++){
			num = parseInt(d.slice(previous, previous + 2));
			if(accepted_codpoints.indexOf(num) !== -1){
				password += String.fromCodePoint(num);
			}
			previous += 2;
		}
		//console.log("Efficiency: %" + Math.floor((password.length / (chunk * 3)) * 100) + "\n");
		password = password.slice(0,chunk);
		if(password.length == chunk){
		console.log("Password: " + password);
		}else{
			console.error("Password creation failed. Try again");
		}
	});
}

//Generates accepted_codepoints
//for(i=0;i<84;i++){codepoints.push("AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~`!@#$%^&*()_-+={[}]\|:;'<,>.?/\" ".charCodeAt(i));}