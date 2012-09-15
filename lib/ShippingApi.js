
/* Module dependencies  */

var UspsClient = require('./UspsClient')
  , util = require('util')
  , url = require('url');

function ShippingApi( username ) {

	this.setUsername(username);
	
	this.url = url.parse("http://testing.shippingapis.com/ShippingAPITest.dll");
}

/* Inherits from `UspsClient` */

util.inherits( ShippingApi, UspsClient );

ShippingApi.prototype.get = function( url, options ) {

	this.connect( this.url, function() {
		console.log('test');
	});

}

ShippingApi.prototype.track = function( trackingID ) {
	var uspsUrl = this.url;
	uspsUrl.search = '?API=TrackV2&XML=<TrackRequest USERID="'+this.getUsername()+'"><TrackID ID="'+trackingID+'"></TrackID></TrackRequest>';
	
	console.log( url.format( uspsUrl ));
	
	this.get( uspsUrl , function() {
		console.log('adfsadfa');
	})
}

// expose ShippingApi;
module.exports = ShippingApi;