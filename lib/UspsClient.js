
/* Module dependencies  */

var http = require('http')
  , xml2js = require('xml2js')
  , events = require('events')
  , util = require('util')
  , url = require('url');

function UspsClient( ) { }

/* Inherits from `events.EventEmitter` */

util.inherits( UspsClient, events.EventEmitter );


/**
 * Connect to Usps webservice and return result.
 *
 * Example:
 *
 * usps.connect( 'http://testing.shippingapis...', function(res) {
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
  
UspsClient.prototype.connect = function( uspsUrl ) {

  events.EventEmitter.call(this);

  var uspsObj = this;

  // Make request to USPS webservice 
  var httpReq = http.get( url.format(uspsUrl), function(res) { 
  
  	// On 'data' parse result of xml to js
    res.on('data', function( chunk ) {

      var parser = new xml2js.Parser();
      parser.parseString(chunk, function(err, result) {

    	if( result.TrackResponse ) {
	        uspsObj.emit('data', result.TrackResponse.TrackInfo[0] );
    	} else {
    		console.log('error');
      		if( result.Error ) {
      			uspsObj.emit('error', result.Error );
      		} else {
				uspsObj.emit('error', {'message':'errrrrrrr'});
      		}    	
    	}

      });
    });

    // pass end along
    res.on('end', function() {
    	uspsObj.emit('end');
    });

    //pass error along
    res.on('error', function(e) {
    	uspsObj.emit('error', e);
    });
    
  });

}

/**
 * Set username used by USPS.
 *
 * Example:
 *
 * usps.setUsername( 'user1234');
 *
 * @param {string} username
 * @api public
 *
 */

UspsClient.prototype.setUsername = function( username ) {
	this.username = username;
}

UspsClient.prototype.getUsername = function( ) {
	return this.username;
}

// expose UspsClient;
module.exports = UspsClient;