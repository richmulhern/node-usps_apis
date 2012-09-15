var assert = require('assert')
  , ShippingApi = require('../lib/ShippingApi.js');
  , Config = require(.config);

var userId = Config.userId;

if( userId == '' ) {
    throw new Error('Must define userId in track_test.js to run test');
}

shipping = new ShippingApi( userId );

shipping.track("EJ958083578US", "EJ958088694US");

var collectedData = [];
var numTrackIDsEnded = 0;

shipping.on('data', function(data) {
    collectedData.push(data);
});

shipping.on('end', function() {
    numTrackIDsEnded = numTrackIDsEnded + 1;
    var matches = 0;

    if(numTrackIDsEnded == 2) {

        var expectedData = [{ 
            '$': { ID: 'EJ958083578US' },
            TrackSummary: [ 'Your item was delivered at 8:10 am on June 1 in Wilmington DE 19801.' ],
            TrackDetail: [ 
                'May 30 11:07 am NOTICE LEFT WILMINGTON DE 19801.',
                'May 30 10:08 am ARRIVAL AT UNIT WILMINGTON DE 19850.',
                'May 29 9:55 am ACCEPT OR PICKUP EDGEWATER NJ 07020.' ] },
        { 
            '$': { ID: 'EJ958088694US' },
            TrackSummary: [ 'Your item was delivered at 1:39 pm on June 1 in WOBURN MA 01815.' ],
            TrackDetail: [ 
                'May 30 7:44 am NOTICE LEFT WOBURN MA 01815.',
                'May 30 7:36 am ARRIVAL AT UNIT NORTH READING MA 01889.',
                'May 29 6:00 pm ACCEPT OR PICKUP PORTSMOUTH NH 03801.' ] 
        }];



        for (var i = 0; i < collectedData.length; i++) {
            for(var j = 0; j < expectedData.length; j++) {
                if( collectedData[i].$.ID == expectedData[j].$.ID ) {
                    assert.deepEqual(collectedData[i], expectedData[j]);
                    matches = matches + 1;
                }
            }
        }

        assert.equal(matches, expectedData.length);

    }
});