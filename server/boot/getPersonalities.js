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
  var districts;
  // var districts, user;
  var appRoot = process.cwd();
  var districtFile = appRoot + '/profiles/district/personalities.json';
  var userFile = appRoot + '/profiles/user/test.json';
  var user = require(userFile);
  var districts = require(districtFile);

  function readFileAsync(file, options) {
      return new Promise(function(resolve, reject) {
          fs.readFile(file, options, function(err, data) {
              if (err) {
                  reject(err);
              } else {
                   var object = JSON.parse(data);
                   //console.log(object);
                   resolve(object);
              }
          });
      });
  }

  comparePersonalities(districts,user);

  // Promise.all([readFileAsync(districtFile), readFileAsync(userFile)]).then(function(first,second){
  //   districts = first;
  //   user = second;
  //   comparePersonalities(districts, user);
  // });

  // readFileAsync(districtFile, 'utf8').then(function(data) {
  //   districts = data;
  //   console.log(districts.numberOfDistricts);
  // }).then(function(data) {
  //   return readFileAsync(userFile, 'utf8').then(function(data) {
  //     user = data;
  //     console.log(user.word_count);
  // }
  // })).then(function(result) {
  //   //console.log(user);
  //   //console.log(districts);
  //   comparePersonalities(districts, user);
  // }).catch(function(e) {
  //   console.log(e);
  // });

  // Promise.all([readFileAsync(districtFile), readFileAsync(userFile)]).then(function(first, second){
  //   console.log(first);
  //   console.log(second);
  // });

  function comparePersonalities(districts, user) {
    var totalDifference = 0;
    var lowestDifference = Number.MAX_SAFE_INTEGER;
    var bestMatch = null;
    for(var i = 0; i < districts.numberOfDistricts; i++) {
      console.log("Trying " + districts.districtPersonalities[i].districtName);
      var currentDifference = compareDistrict(i);
      if(currentDifference < lowestDifference){
        lowestDifference = currentDifference;
        bestMatch = i;
        console.log("New best match: " + districts.districtPersonalities[bestMatch].districtName);
      }
    }
    console.log(districts.districtPersonalities[bestMatch].districtName);
  }

  function compareDistrict(districtNumber) {
    var difference = 0;
    //compare big 5 personalities
    for (var i = 0; i < 5; i++) {
      difference += Math.abs(districts.districtPersonalities[districtNumber].personality[i].percentile - user.personality[i].percentile);
      //console.log(difference);
    }
    //compare different needs: Closeness, Curiosity, Harmony, Self-expression, Stability
    var usedNeedsIndices = [1,2,4,9,10];  //not all needs values returned by the watson profile are used
    for (var i = 0; i < 5; i++) {
      difference += Math.abs(districts.districtPersonalities[districtNumber].needs[i].percentile - user.needs[usedNeedsIndices[i]].percentile);
      //console.log(difference);
    }
    //Compare different values: Conservation, Openness to change, Hedonism, Self-enhancement
    for (var i = 0; i < 5; i++) {
      difference += Math.abs(districts.districtPersonalities[districtNumber].values[i].percentile - user.values[i].percentile);
      //console.log(difference);
    }
    return difference;
  }

};
