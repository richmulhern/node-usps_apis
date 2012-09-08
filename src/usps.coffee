http = require 'http'
xml2js = require 'xml2js'

config = require './config/config'

options = 'http://testing.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackRequest USERID="' + config.usps.userId + '"><TrackID ID="EJ958083578US"></TrackID></TrackRequest>'

http.get options, (res) ->
    res.on 'data', (chunk) ->
        parser = new xml2js.Parser()
        parser.parseString chunk, (err, result) ->
        	console.log result.TrackResponse.TrackInfo
    res.on 'end', () ->
        console.log 'done'
    res.on 'error', (e)->
    	console.log 'problems: ' + e.message