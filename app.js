
/**
 * Generated Node.js application that can run on IBM Bluemix
 */

var http = require("http"),
	fs = require("fs");
var express = require("express");
var app = express();

var appport = process.env.PORT || 8888;

app.use(express.static(__dirname + '/view'));
app.use(express.json({ limit : '1mb'}));

app.get('*', function(req, res) {
	res.sendFile('index.html',{ root: 'view' });	
});

app.get('/init',function(req, res){
	res.json({ 
		damName : 'idukki'
		waterLevel : '900' 
	})
});	
app.listen(appport);