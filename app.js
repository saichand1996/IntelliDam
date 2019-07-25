
/**
 * Generated Node.js application that can run on IBM Bluemix
 */

var http = require("http"),
	fs = require("fs");
var express = require("express");
const request = require('request');
const cheerio = require('cheerio');
const tabletojson = require('tabletojson');

var app = express();

var appport = process.env.PORT || 8888;

app.use(express.static(__dirname + '/view'));
app.use(express.json({ limit : '1mb'}));


app.get('/api',function(req, res) {

	tabletojson.convertUrl(
		'https://irrigationap.cgg.gov.in/wrd/dashBoard',
		{ stripHtmlFromCells: true },
		function(tablesAsJson) {
		  //Print out the 1st row from the 2nd table on the above webpage as JSON 
		   var data = (tablesAsJson[1][23]);
		   console.log(data);
		  res.json(JSON.parse(JSON.stringify(data)));
		}
	  );

});	
app.get('*', function(req, res) {	
	res.sendFile('index.html',{ root: 'view' });	
});
app.listen(appport);