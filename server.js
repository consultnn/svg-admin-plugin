var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('dist'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(3003, function() {
	console.log('server started');
});