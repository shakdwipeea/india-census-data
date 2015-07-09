 var Crawler = require('simplecrawler');
 var noodle = require('noodlejs');
 var _ = require('lodash');
 var request = require('request');
 //var relax = require('./relax')

 var dbName = 'census';

 var MongoClient = require('mongodb').MongoClient;
 var url = 'mongodb://localhost:27017/' + dbName;

 MongoClient.connect(url, function  (err, db) {
 	if(err) {
 		console.log(err)
 		throw new Error(err)
 	} 

 	startCrawling(db);
 })

 
/*
 relax.createDb(dbName, function  (err) {
 	if(err == "file_exists") {
 		//Db exists
 		console.log('Db exists');
 	} 
 	else if(err) {
 		throw new Error(err)
 	}
 	//Db created
 	console.log("Db created")
 	startCrawling();
 })*/

 function convertToDoc (arrHtml) {
 	var tempObj = {};	
 	tempObj.district = arrHtml[0].results[0];
 	tempObj.population = arrHtml[1].results[0];
 	tempObj.area = arrHtml[2].results[0];
 	tempObj.density = arrHtml[3].results[0];
 	tempObj.sexRatio = arrHtml[4].results[0];
 	tempObj.literacy = arrHtml[5].results[0];
 	return tempObj;
 }

 function startCrawling (db) {
	 Crawler.crawl('https://www.facebook.com/rajukumar.mishra?fref=nf')
	 .on('fetchcomplete', function(queueItem) {
		 console.log('Url', queueItem.url)
		 var arr = queueItem.url.split('/');

		 //further processing required in district selector
		 var url = {
			 districtSelector: 'div.breadcrumbs>div span:nth-child(4) a',
		 	populationSelector: 'table#table:first-of-type tr:nth-child(2) td:nth-child(2)',
		 	areaSelector: 'table#table:first-of-type tr:nth-child(6) td:nth-child(2)',
		 	densitySelector: 'table#table:first-of-type tr:nth-child(7) td:nth-child(2)',
		 	sexRationSelector: 'table#table:first-of-type tr:nth-child(9) td:nth-child(2)',
		 	literacySelector: 'table#table:first-of-type tr:nth-child(11) td:nth-child(2)'
		 }

		 /*if(queueItem.url.slice(-4) == "html" && arr[3] == "census" && arr[4] == "district") {

			 var queries = [];

			 _.mapKeys(url, function(val, key) {

				 var tempQuery = {
						url: queueItem.url,
				 		selector: val,
				 		extract: 'text'
				 }

				 queries.push(tempQuery);
			 })

			 console.log('Query length', queries.length)

			 noodle.query(queries).then(function (results) {
				results.results[0].results[0] = _.initial(results.results[0].results[0].split(' ')).join(' ')
				var doc = convertToDoc(results.results);
				console.log(doc);
				/*relax.insert(dbName, JSON.stringify(doc), function  (err) {
					if(err) {
						console.log(err);
						throw new Error(err)
					}
				})*/

			 /*	db.collection('census').insertOne(doc, function  (err, result) {
			 		if (err) {
			 			console.log(err)
			 			throw new Error(err)
			 		};
			 		console.log("Write")
			 	})

			       
			 })

		   
	 }*/

	/* else if(_.last(arr) == 'district.php') {
	 	var query = {
	 		url: queueItem.url,
	 		selector: 'div.table div.row div.cell a',
	 		extract: 'text'
	 	}

	 	noodle.query(query).then(function (result) {
	 		var arr = result.results;
	 		//console.log(arr[0].results)
	 		//console.log(_.zipObject(_.chunk(arr[0].results,2)));
	 	})



	 }	*/

 })
 }

