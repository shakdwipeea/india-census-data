 var noodle = require('noodlejs');
 var _ = require('lodash');
 var request = require('request');
 var relax = require('./relax')

 var dbNameWrite = 'city';
 var dbNameRead = 'census';

/*  relax.createDb(dbNameWrite, function  (err) {
 	if(err == "file_exists") {
 		//Db exists
 		console.log('Db exists');
 	} 
 	else if(err) {
 		throw new Error(err)
 	}
 	//Db created
 	console.log("Db created")
 	start();
 })*/


 var dbName = 'census';

 var MongoClient = require('mongodb').MongoClient;
 var url = 'mongodb://localhost:27017/' + dbName;

 MongoClient.connect(url, function  (err, db) {
 	if(err) {
 		console.log(err)
 		throw new Error(err)
 	} 

 	start(db);
 })




function start(db) {

	relax.getAll(dbNameRead, function  (err, rows) {
		if(err) {
			throw new Error(err)
		} 
		var districts = _.map(rows, function  (value) {
			return value.doc.district;
		})


		_.each(districts, function  (value) {
			getData(value, db);
		})
	})

	
}

function getData (district, db) {
	console.log(district)
	var query = {
		url: 'http://en.wikipedia.org/wiki/Category:Cities_and_towns_in_' + district + '_district',
 		selector: 'div#mw-pages li a',
 		extract: 'text',
 		cache: false
	}

	noodle.query(query).then(function (result) {
		//console.log(result);
		var arr = result.results[0].results;
		
		console.log(arr, district);

		arr = _.map(arr, function  (value) {
			return value.split(',')[0]
		})

		_.map(arr, function  (value) {
			// body...
			var doc = {
				city: value,
				district: district
			}

			/*relax.insert(dbNameWrite, JSON.stringify(doc), function  (err) {
				if(err) {
					throw new Error(err)
				}
			})*/

			db.collection('city').insertOne(doc, function  (err, d) {
				if (err) {console.log(err)};
				console.log("Write")
			})

		})
	})
}