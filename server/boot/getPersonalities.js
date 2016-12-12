'use strict';

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  var fs = require('fs');

  var districts, user;
  var appRoot = process.cwd();
  var districtFile = appRoot + '/profiles/district/personalities.json';
  var userFile = appRoot + '/profiles/user/test.json';

  function readFileAsync(file, options) {
      return new Promise(function(resolve, reject) {
          fs.readFile(file, options, function(err, data) {
              if (err) {
                  reject(err);
              } else {
                   resolve(data);
              }
          });
      });
  }

  readFileAsync(districtFile, 'utf8').then(function(data) {
    districts = JSON.parse(data);
    console.log(districts.numberOfDistricts);
  }).then(readFileAsync(userFile, 'utf8').then(function(data) {
    user = JSON.parse(data);
    console.log(user.word_count);
  })).then(function(result) {
    comparePersonalities(districts, user);
  }).catch(function(e) {
    console.log(e);
  });

  function comparePersonalities(districts, user) {
    var totalDifference = 0;
    console.log(comparDistrict(districtName, user));
    var lowestDifference = Number.MAX_SAFE_INTEGER;
    var bestMatch = null;
    for(var i = 0; i < districts.numberOfDistricts; i++) {
      var currentDifference = compareDistrict(i);
      if(currentDifference < lowestDifference){
        lowestDifference = currentDifference;
        bestMatch = i;
      }
    }
    console.log(districts.districtPersonalities[bestMatch].districtName);
  }

  function compareDistrict(districtNumber) {
    var difference = 0;
    //compare big 5 personalities
    for (var i = 0; i < 5; i++) {
      difference += Math.abs(districts.districtPersonalities[districtNumber].personality[i].percentile - user.personality[i].percentile);
      console.log(difference);
    }
    //compare different needs: Closeness, Curiosity, Harmony, Self-expression, Stability
    for (var i = 0; i < 5; i++) {
      difference += Math.abs(districts.districtPersonalities[districtNumber].needs[i].percentile - user.needs[i].percentile);
      console.log(difference);
    }
    //Compare different values: Conservation, Openness to change, Hedonism, Self-enhancement

    return difference;
  }

};
