var assert = require('assert')
  , ShippingApi = require('../lib/ShippingApi.js');

var userId = '' //Insert your user id

if( userId == '' ) {
	throw new Error('Must define userId in track_test.js to run test');
}

shipping = new ShippingApi( userId );

shipping.track("EJ958083578US");

shipping.on('data', function(data) {
	assert.deepEqual({ 
        '$': { ID: 'EJ958083578US' },
        TrackSummary: [ 'Your item was delivered at 8:10 am on June 1 in Wilmington DE 19801.' ],
        TrackDetail: [ 
            'May 30 11:07 am NOTICE LEFT WILMINGTON DE 19801.',
            'May 30 10:08 am ARRIVAL AT UNIT WILMINGTON DE 19850.',
            'May 29 9:55 am ACCEPT OR PICKUP EDGEWATER NJ 07020.',
        ] 
    }, data);
});