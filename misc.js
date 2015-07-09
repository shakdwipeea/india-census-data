 var Crawler = require('simplecrawler');
 var noodle = require('noodlejs');
 var _ = require('lodash');
 var request = require('request');

console.log(district)
	var query = {
		url: 'http://www.rvce.edu.in/results/',
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