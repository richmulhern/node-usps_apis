Node USPS SDK
==============

Node.js SDK for the USPS tracking and shipping APIs.

More data on the APIs can be found at https://www.usps.com/business/webtools-technical-guides.htm

##Usage

###Tracking API

Use the Tracking API to track packages.

```javascript
  var usps = require('./node_modules/usps');
  var ShippingApi = usps.ShippingApi;

  var userId = '' //Insert your user id

  shipping = new ShippingApi( userId );

  shipping.track("EJ958083578US");

  shipping.on('data', function(data) {
	  console.log(data); 
        /* '$': { ID: 'EJ958083578US' },
           TrackSummary: [ 'Your item was delivered at 8:10 am on June 1 in Wilmington DE 19801.' ],
           TrackDetail: [ 
            'May 30 11:07 am NOTICE LEFT WILMINGTON DE 19801.',
            'May 30 10:08 am ARRIVAL AT UNIT WILMINGTON DE 19850.',
            'May 29 9:55 am ACCEPT OR PICKUP EDGEWATER NJ 07020.',
           ] */
        
  });
```