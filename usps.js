var UspsClient = require('./lib/UspsClient');

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