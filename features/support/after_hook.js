var request = require('superagent');

function extractErrors(body) {
  var errors = []

  body.testSuiteResultReports.forEach( function(testSuiteResultReport){
      testSuiteResultReport.testCaseResultReports.forEach( function(testCaseResultReport){
         testCaseResultReport.testStepResultReports.forEach( function(testStepResultReport){
           if( testStepResultReport.assertionStatus == "FAILED" ){
             testStepResultReport.messages.forEach( function(msg){ errors.push( msg ) })
           }
         })
      })
    }
  )

  return errors.join( "\n");
};

var myAfterHooks = function () {
  this.After(function (scenario, callback) {

    var self = this

    if( this.requestBody ){
      this.testStep.requestBody = JSON.stringify( this.requestBody )
    }

    request
      .post(this.server + "/v1/readyapi/executions")
      .query({async: false})
      .auth(this.username, this.password)
      .send(this.recipe)
      .end(function (err, res) {
        if( err ){
          callback(new Error( "TestServer error: " + err));
        }
        else if( res.body.status != "FINISHED") {
          callback( extractErrors( res.body ))
        }
        else {
          callback()
        }
      })
  });
};

module.exports = myAfterHooks;