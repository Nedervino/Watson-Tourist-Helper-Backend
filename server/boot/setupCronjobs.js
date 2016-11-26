'use strict';
var cron = require('node-cron');
var dbInitialize = require('./fillDatabase.js');

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

   cron.schedule('10,20,30,40,50 * * * * *', function(){          // '00 00 * * *' for every day at midnigt
     console.log('Current time is ' + new Date() + '. Updating database');
     dbInitialize(app);
   });

};
