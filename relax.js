/*===============================================
=            Relaxjs couch db driver            =
===============================================*/
 /**
 *
 * A driver to implement basic functionality for couchdb
 *
 **/
 


/*-----  End of Relaxjs couch db driver  ------*/



var request = require('request');
var couchDb = 'http://127.0.0.1:5984/';
var uuidGen = require('./id2otp');
var _ = require('lodash')


exports.createDb = function  (dbName, callback) {
	request.put(couchDb + dbName, function  (err, res, body) {
		body = JSON.parse(body);
		if(body.error) {
			callback(body.error);
		} else if(body.ok) {
			callback(null);
		}
	})
}

exports.deleteDb = function  (dbName, callback) {
	request.delete(couchDb + dbName, function  (err, res, body) {
		body = JSON.parse(body);
		console.log('Delete', body);
		callback(true);
	})
}

exports.insert = function  (dbName, doc, callback) {
	console.log('Trying to insert')
	var uid = uuidGen('akash', true, 25);
	request.put(couchDb + dbName + "/" + uid, {
		form: doc
	}, function  (err, res, body) {
		body = JSON.parse(body);
		console.log('a',body)
		if(err) {
			callback(err);
		}

		else if(body.err) {
			callback(body.err);
		}

		else if(body.ok) {
			console.log(body)
			callback(null);
		}
	})
}

exports.getCityByDistrict = function  (dbName, district, callback) {
	//To be implemented not usable
	request.get(couchDb + dbName + '/_design/city_doc/_view/city_district_view?key=' + district, function  (err, res, body) {
		if(err) {
			callback(err, null);
		} else {
			if (typeof body == "string") {
				body = JSON.parse(body)
			};

			var arr = body.rows;

			callback(null, arr);
		}
	})
}

exports.getAll = function  (dbName, callback) {
	request.get(couchDb + dbName + '/_all_docs/?include_docs=true', function  (err, res, body) {
		if(err) {
			callback(err, null);
		} else {
			if (typeof body == "string") {
				body = JSON.parse(body)
			};
			callback(null, body.rows);
		}
	})
}