
/* Module dependencies  */

var http = require('http')
  , xml2js = require('xml2js')
  , events = require('events')
  , util = require('util');

function UspsClient() {

}

/* Inherits from `http.ClientRequest` */


util.inherits( UspsClient, events.EventEmitter );

UspsClient.prototype.connect = function( url, callback ) {

  var uspsObj = this;
  callback( uspsObj );

  var httpReq = http.get(options, function(res) { 
    res.on('data', function( chunk ) {

      var parser = new xml2js.Parser();
      parser.parseString(chunk, function(err, result) {
      	if( result.Error ) {
      		uspsObj.emit('error', result.Error );
      	} else {
	        uspsObj.emit('data', result.TrackResponse.TrackInfo[0] );
      	}
      });

    });
    
    res.on('error', function(e) {
    	console.log(e);
    });
    
  });


/*, function(res) {


    res.on('data', function(chunk) {

      var parser;
      parser = new xml2js.Parser();
      return parser.parseString(chunk, function(err, result) {
        if( result.TrackResponse ) {
          console.log(result.TrackResponse.TrackInfo);
        } else {
          console.log(result);  
        }
      });
    });

    res.on('end', function() {
      return console.log('done');
    });

    res.on('error', function(e) {
      console.log(this);
      this.emit('error', e);
    }); 

    callback(res);
  });*/

}

var userId = '418RICHA2151';

// bad API url
var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="23423RCIASD2324"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

// good url
var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="' + userId + '"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

console.log( options );

usps = new UspsClient();

usps.connect( options, function(res) {

    res.on( 'data', function(data) {
      console.log(data);
    });
    
    res.on( 'error', function(e) {
    	console.log( e );
    });

});