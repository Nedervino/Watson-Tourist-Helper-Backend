//boot script for loading all relevant data into the mySQL database from open.data.amsterdam
'use strict';

var request = require('request');
var dataObject;

//not usable for mySQL instance, optionally switch to mongoDB in production
function createFromIntrospection(object) {
  var firstItem = object[0];

  // Create a model from the user instance
  var Attraction2 = db.buildModelFromInstance('Attraction2', firstItem, {idInjection: true});

  // Use the model for create, retrieve, update, and delete
  var obj = new Attraction2(firstItem);

  console.log(obj.toObject());

  Attraction2.create(firstItem, function (err, u1) {
    console.log('Created: ', u1.toObject());
    Attraction2.findById(u1.id, function (err, u2) {
      console.log('Found: ', u2.toObject());
    });
  });
}

function constructModelItem(item) {

  var modelItem = {
    name: item.details.en.title,
    shortDescription: item.details.en.shortdescription,
    longDescription: item.details.en.longdescription,
    url: item.urls[0],
    startDate: item.dates.startdate,
    endDate: item.dates.enddate,
    singleDates: item.dates.singles,
    city: item.location.city,
    address: item.location.address,
    zipcode: item.location.zipcode,
    latitude: item.location.latitude,
    longitude: item.location.longitude,
  }

  return modelItem;
}

module.exports = function(app) {
  var db = app.dataSources.mySQLDB;
  app.dataSources.mySQLDB.automigrate('Attraction', function(err) {
    if (err) throw err;

    //load dataset into JSON object
    request('http://open.datapunt.amsterdam.nl/Attracties.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body)
        dataObject = JSON.parse(body);
        var itemArray = [];
        //console.log(typeof dataObject);
        //console.log(dataObject[0].details.en.title)
        for (var key in dataObject) {
          var item = dataObject[key];
          var modelItem = constructModelItem(item);
          itemArray.push(modelItem);

        }
        app.models.Attraction.create(itemArray, function(err, attractions) {
          if (err) throw err;

          console.log('Models created: \n', attractions.length);
        });
        //var firstAttraction = dataObject[0];
        //console.log(firstAttraction.details.en.title);
      }
    })


  });
};

