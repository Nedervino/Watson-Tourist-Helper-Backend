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

   cron.schedule('* * * * *', function(){          // '* * *' for running every days
     console.log('running a task every minute');
     console.log(__dirname);
     dbInitialize;

   });

};
