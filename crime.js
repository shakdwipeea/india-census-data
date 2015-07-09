var Crawler = require('simplecrawler');

Crawler.crawl('http://timesofindia.indiatimes.com/topic/Crime')
	.on('fetchcomplete', function  (queueItem) {
		console.log('Url', queueItem.url);
	});