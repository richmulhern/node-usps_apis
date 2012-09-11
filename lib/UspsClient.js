
/* Module dependencies  */

var http = require('http')
  , xml2js = require('xml2js')
  , events = require('events')
  , util = require('util');

function UspsClient() {

}

/* Inherits from `events.EventEmitter` */

util.inherits( UspsClient, events.EventEmitter );


/**
 * Connect to Usps webservice and return result.
 *
 * Example:
 *
 * usps.connect( 'http://testingshippingapis...', function(res) {
 *
 *   res.on( 'data', function(data) {
 *     console.log(data);
 * 	 });
 *
 *   res.on( 'error', function(e) {
 *   	console.log( e );
 *   });
 *
 * });
 *
 * @param {string} url
 * @param {function} callback
 * @api public  
 *
 */
  
UspsClient.prototype.connect = function( url, callback ) {

  var uspsObj = this;
  callback( uspsObj );

  var httpReq = http.get(url, function(res) { 
  
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
    
    res.on('end', function() {
    	uspsObj.emit('end');
    });
    
    res.on('error', function(e) {
    	uspsObj.emit('error', e);
    });
    
  });

}

module.exports = UspsClient;