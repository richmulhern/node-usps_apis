
/* Module dependencies  */

var UspsClient = require('./UspsClient')
  , util = require('util');

function ShippingApi( username ) {

	this.setUsername(username);

}

/* Inherits from `events.EventEmitter` */

util.inherits( ShippingApi, UspsClient );

ShippingApi.prototype.get = function( apiCall, options, callback ) {
	console.log(this.getUsername());
}
  
/*UspsClient.prototype.connect = function( url, callback ) {

  var uspsObj = this;
  callback( uspsObj );

  // Make request to USPS webservice 
  var httpReq = http.get(url, function(res) { 
  
  	// On 'data' parse result of xml to js
    res.on('data', function( chunk ) {
    
      var parser = new xml2js.Parser();
      parser.parseString(chunk, function(err, result) {
    	
    	// if webservice returns error emit 'error'  
      	if( result.Error ) {
      		uspsObj.emit('error', result.Error );
      	} else {	// else emit 'data'
	        uspsObj.emit('data', result.TrackResponse.TrackInfo[0] );
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

}*/

// expose ShippingApi;
module.exports = ShippingApi;