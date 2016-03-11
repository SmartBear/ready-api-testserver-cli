module.exports = function () {
  this.Given(/^the API running at (.+)$/, function (endpoint) {
    this.testStep.URI = endpoint
  });

  this.When(/^a (.+) request to (.+) is made$/, function (method,path) {
    this.testStep.method = method
    this.testStep.URI += path
  });

  this.When(/^the (.+) parameter is (.+)/, function (param,value) {
    this.testStep.parameters.push( { type:"QUERY", name:param, value:value } )
  });

  this.When(/^the (.+) header is (.+)$/, function (header,value) {
    this.testStep.parameters.push( { type:"HEADER", name:header, value:value } )
  });

  this.Then(/^a (\d+) response is returned within (\d+)ms$/, function (statuscode, millis) {
    this.testStep.assertions.push( { type:"Valid HTTP Status Codes", validStatusCodes:[statuscode]})
    this.testStep.assertions.push( { type:"Response SLA", maxResponseTime:millis})
  });

  this.When(/^the request expects (.+)$/, function (type) {

    if( type.indexOf( '/') == -1 ){
      type = "application/" + type
    }

    this.testStep.parameters.push( { type:"HEADER", name:"Accepts", value:type } )
  });

  this.When(/^([^ ]*) is (.*)$/, function (param,value) {
    if( !this.requestBody ){
      this.requestBody = {}
    }
    this.requestBody[param] = value
  });

  this.When(/^the request body is$/, function (body) {
    this.requestBody = body
  });

  this.Then(/^the response body contains$/, function (bodyToken) {
    this.testStep.assertions.push( { type:"Contains", token:bodyToken})

  });
}
