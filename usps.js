
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
        uspsObj.emit('data', result);
      });

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

var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="' + userId + '"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

usps = new UspsClient();

usps.connect( options, function(res) {
    console.log('CONNECTING...');

    res.on('data', function(data) {
      console.log(data);
    })
});