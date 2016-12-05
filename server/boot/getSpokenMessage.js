'use strict';

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  // func getAuthToken() {
  //   let authManager = IMFAuthorizationManager.sharedInstance()
  //   authManager.obtainAuthorizationHeaderWithCompletionHandler { (response:IMFResponse!, error:NSError!) -> Void in
  //       var errorMsg: String
  //       if error != nil {
  //           //Handle Error
  //       } else {

  //             //Here is the authHeader, use it how you like
  //             var authHeader = response.authorizationHeader
  //   }
  // }}

  // process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
