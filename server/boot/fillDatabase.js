//boot script for loading Attractions, Events, and other places into the database from open.data.amsterdam
//app.dataSources.Dataset.getAttractions(processResponse);
var request = require('request');
var dataObject;
var defaultValue = "empty value";

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

module.exports = function(app) {
  var db = app.dataSources.mySQLDB;
  app.dataSources.mySQLDB.automigrate('Attraction', function(err) {
    if (err) throw err;

    //load dataset into JSON object
    request('http://open.datapunt.amsterdam.nl/Attracties.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body)
        dataObject = JSON.parse(body);
        //console.log(typeof dataObject);
        //console.log(dataObject[0].details.en.title)
        for (var key in dataObject) {
         item = dataObject[key];
          app.models.Attraction.create([
            {
              name: (typeof item.details.en.title !== 'undefined') ? item.details.en.title : null,
              //shortDescription: (typeof item.details.en.shortdescription !== 'undefined') ? item.details.en.shortdescription : null,
              //longDescription: (typeof item.details.en.longdescription !== 'undefined') ? item.details.en.longdescription : null,
              city: (typeof item.location.city !== 'undefined') ? item.location.city : null,
              // address: item.location.address || defaultValue,
              // zipcode: item.location.zipcode || defaultValue,
              // latitude: item.location.latitude || defaultValue,
              // longitude: item.location.longitude || defaultValue,
            },
          ], function(err, attractions) {
            if (err) throw err;

            console.log('Models created: \n', attractions);
          });
        }
        //var firstAttraction = dataObject[0];
        //console.log(firstAttraction.details.en.title);
      }
    })


    // app.models.Attraction.create([
    //   {
    //     name: 'Attraction 1',
    //     shortDescription: 'Wonderful place'
    //   },
    //   {
    //     name: 'Attraction 2',
    //     shortDescription: 'Wonderful place'
    //   },
    //   {
    //     name: 'Attraction 3',
    //     shortDescription: 'Wonderful place'
    //   },
    // ], function(err, attractions) {
    //   if (err) throw err;

    //   console.log('Models created: \n', attractions);
    // });



  });
};

