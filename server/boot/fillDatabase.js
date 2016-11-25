//boot script for loading Attractions, Events, and other places into the database from open.data.amsterdam
//app.dataSources.Dataset.getAttractions(processResponse);
console.log("HI");

module.exports = function(app) {
  app.dataSources.mySQLDB.automigrate('Attraction', function(err) {
    if (err) throw err;

    app.models.Attraction.create([
      {
        name: 'Attraction 1',
        shortDescription: 'Wonderful place'
      },
      {
        name: 'Attraction 2',
        shortDescription: 'Wonderful place'
      },
      {
        name: 'Attraction 3',
        shortDescription: 'Wonderful place'
      },
    ], function(err, attractions) {
      if (err) throw err;

      console.log('Models created: \n', attractions);
    });
  });
};

