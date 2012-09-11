var UspsClient = require('./lib/UspsClient');
var ShippingApi = require('./lib/ShippingApi');

var userId = '418RICHA2151';

// bad API url
var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="23423RCIASD2324"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

// good url
var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="' + userId + '"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

usps = new UspsClient( userId );

usps.connect( options, function(res) {

    res.on( 'data', function(data) {
      console.log(data);
    });
    
    res.on( 'error', function(e) {
    	console.log( e );
    });

});

console.log( usps.getUsername() );



shipping = new ShippingApi( userId );

shipping.get('TrackV2', {"userId": userId, trackId: "EJ958083578US"}, function( res ) {

	res.on( 'data', function(data) {
		console.log(data);
	});

})