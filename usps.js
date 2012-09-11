
/* Module dependencies  */

var http = require('http')
  , xml2js = require('xml2js')
  , config = require('./lib/config/config');

var options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="' + config.usps.userId + '"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>';

var events = require("events");

http.get(options, function(res) {
  res.on('data', function(chunk) {
    var parser;
    parser = new xml2js.Parser();
    return parser.parseString(chunk, function(err, result) {
      return console.log(result.TrackResponse.TrackInfo);
    });
  });
  res.on('end', function() {
    return console.log('done');
  });
  return res.on('error', function(e) {
    return console.log('problems: ' + e.message);
  });
});
