
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

	this.connect( this.url );

}

ShippingApi.prototype.track = function( ) {
	var uspsUrl = this.url;
  	for (var i = 0; i < arguments.length; i++) {
		uspsUrl.search = '?API=TrackV2&XML=<TrackRequest USERID="'+this.getUsername()+'"><TrackID ID="'+arguments[i]+'"></TrackID></TrackRequest>';
	
		this.get( uspsUrl );
  	}
}

// expose ShippingApi;
module.exports = ShippingApi;