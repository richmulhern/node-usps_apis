var http = require('http');
var url = require('url');
var xml2js = require('xml2js');

var config = require('./config/config');

var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="'+config.usps.userId+'"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

var req = http.request(options, function(res) {

  res.setEncoding('utf8');
  res.on('data', function (chunk) {

	var parser = new xml2js.Parser();
    parser.parseString(chunk, function (err, result) {
        console.log(result.TrackResponse.TrackInfo);
    });    

  });

});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();