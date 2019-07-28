
/**
 * Generated Node.js application that can run on IBM Bluemix
 */

var http = require("http"),
	fs = require("fs");
var express = require("express");
const request = require('request');
const cheerio = require('cheerio');
const tabletojson = require('tabletojson');
const AWS  = require('ibm-cos-sdk');

const config = {
    endpoint: 's3.eu.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'OkzCQExhDQy8Pk9TzMbTEDddM4LQdWgWcv-ZH7ENafvC',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/9b204a210243411b914dde8c0c4302b1:7c0caf31-789e-421c-87a4-d16a8b1c0948::',
};

var cos = new AWS.S3(config);

function getItem(bucketName, itemName, callback) {
    console.log(`Retrieving item from bucket: ${bucketName}, key: ${itemName}`);
    return cos.getObject({
        Bucket: bucketName, 
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
			//console.log('File Contents: ' + Buffer.from(data.Body).toString());
			callback(Buffer.from(data.Body).toString());
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function getDataFromDam1(callback){
	tabletojson.convertUrl(
		'https://irrigationap.cgg.gov.in/wrd/dashBoard',
		{ stripHtmlFromCells: true },
		function(tablesAsJson) {
		  //Print out the 1st row from the 2nd table on the above webpage as JSON		   
		   //console.log(data);
		   for(i=1;i<40;i++){
				var data = (tablesAsJson[1][i]);
				obj = JSON.parse(JSON.stringify(data));
				if(obj["Reservoir\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tName_2"]=="SRISAILAM"){
					console.log(data);
					break;
				}
		   }
		  callback(JSON.parse(JSON.stringify(data)));
		}
	  );
}

var app = express();

var appport = process.env.PORT || 8888;

app.use(express.static(__dirname + '/view'));
app.use(express.json({ limit : '1mb'}));


app.get('/dam1',function(req, res) {
	tabletojson.convertUrl(
		'https://irrigationap.cgg.gov.in/wrd/dashBoard',
		{ stripHtmlFromCells: true },
		function(tablesAsJson) {
		  //Print out the 1st row from the 2nd table on the above webpage as JSON		   
		   //console.log(data);
		   for(i=1;i<40;i++){
				var data = (tablesAsJson[1][i]);
				obj = JSON.parse(JSON.stringify(data));
				if(obj["Reservoir\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tName_2"]=="SRISAILAM"){
					//console.log(data);
					break;
				}
		   }
		  res.json(JSON.parse(JSON.stringify(data)));
		}
	  );
});	

app.get('/predict1',function(req,res){	
	getItem('rainfall-donotdelete-pr-jdznbtggz5fj5t','Estimation.csv', function(result){		
		jsonData  = JSON.parse(JSON.stringify(result));
		console.log(jsonData);
	});
	getDataFromDam1(function(result){
		var predictedPrecipitation = 370; //in mm from Cloud Objected Storage
		const runOffFactor = 0.9;
		const areaOfDam1 = 616; //in km^2
		var capacity = 216; //in Tmcft
		var specificOptimumLevel = 854; //in ft
		var collectedRainfall = (predictedPrecipitation)*(areaOfDam1*(1000000))*(runOffFactor); //in liters
		var TotalFtOfrainfall = (collectedRainfall * 0.035315) / (10.764*areaOfDam1*(1000000)); //in ft
		var currentLevel = (result["Current\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tLevel in Feet_2"]); //in  ft
		var TotalEstimatedLevel = Number(Math.round(TotalFtOfrainfall,2)) + Number(currentLevel); //in ft
		var inflowRate = result["Inflow in\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCusecs_2"]*(36000); //accumulated inflow cu ft after 10hrs
		var outflowRate = result["Outflow in\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCusecs_2"]*(36000); //left outflow cu ft after 10hrs
		var finalEstimation = TotalEstimatedLevel+(inflowRate/(10.764*areaOfDam1*(1000000)))-(outflowRate/(10.764*areaOfDam1*(1000000))); // after 10hrs  in ft
		var predictionMsg = "";
		if(finalEstimation > specificOptimumLevel){
			predictionMsg="Level Crossing Observed NEED ATTENTION";
		}
		else {
			predictionMsg="Optimum";
		}
		//finalEstimation = (finalEstimation)/(10.764*areaOfDam1*(1000000));
		res.json({estimation:finalEstimation,prediction:predictionMsg});
	})
	
});

app.get('/dam2',function(req, res) {
	tabletojson.convertUrl(
		'https://irrigationap.cgg.gov.in/wrd/dashBoard',
		{ stripHtmlFromCells: true },
		function(tablesAsJson) {
		  //Print out the 1st row from the 2nd table on the above webpage as JSON		   
		   //console.log(data);
		   for(i=1;i<40;i++){
				var data = (tablesAsJson[1][i]);
				obj = JSON.parse(JSON.stringify(data));
				if(obj["Reservoir\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tName_2"]=="NAGARJUNA SAGAR"){
					//console.log(data);
					break;
				}
		   }
		  res.json(JSON.parse(JSON.stringify(data)));
		}
	  );
});	

app.get('*', function(req, res) {	
	res.sendFile('index.html',{ root: 'view' });	
});
app.listen(appport);