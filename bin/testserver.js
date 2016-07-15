#! /usr/bin/env node
console.log('Ready! API TestServer Command-Line Interface 1.0.3');

var fs = require("fs");
var program = require('commander');
var request = require('superagent');
var archiver = require('archiver');
var zipdir = require('zip-dir');

program
  .version('1.0.3')
  .usage('[options] <recipe/project/composite-folder>')
  .option('-u, --username <usernam>', 'Ready! API TestServer username')
  .option('-p, --password <password>', 'Ready! API TestServer password')
  .option('-c, --config <config file>', 'Config file (defaults to config.json)', 'config.json')
  .option('-s, --server <server>', 'Ready! API TestServer endpoint')
  .option('-e, --environment <environment>', 'The environment to use (for project files only)')
  .option('-C, --testcase <testcase to run>', 'The TestCase to use (for project files only)')
  .option('-S, --testsuite <testsuite to run>', 'The TestSuite to use (for project files only)')
  .option('-a, --async <true/false>', 'Toggles execution mode (default is false)')
  .option('-b, --callback <endpoint>', 'Endpoint to call when test finishes')
  .parse(process.argv)

if( program.args.length == 0 ){
  program.outputHelp()
  return
}

var config = initConfig();

console.log( "Using TestServer at " + config.server )

program.args.forEach(function (file) {

  var extension = file.substr( file.length-4).toLowerCase()

  if( fs.lstatSync(file).isDirectory() ){
    sendCompositeRequest( file )
  }
  else if( extension == ".xml" ){
    sendXmlRequest( file )
  }
  else {
    sendRecipeRequest( file )
  }
});

function sendXmlRequest(file) {
  var project = fs.readFileSync(file)

  var req = request
    .post(config.server + "/v1/readyapi/executions/xml")
    .query(buildRecipeParams())
    .auth(config.username, config.password)
    .type( 'application/xml')
    .send( project )
    .end(function (err, res) {
      console.log("HTTP Response: " + res.status)
      console.log(JSON.stringify(res.body,null,2))
    })
}

function sendCompositeRequest(file) {
  zipdir(file, function (err, buffer) {
    var req = request
      .post(config.server + "/v1/readyapi/executions/composite")
      .query(buildProjectParams())
      .auth(config.username, config.password)
      .type( 'application/zip')
      .send( buffer )
      .end(function (err, res) {
        console.log("HTTP Response: " + res.status)
        console.log(JSON.stringify(res.body,null,2))
      })
  });
}


function sendRecipeRequest(file) {
  var recipe = JSON.parse(fs.readFileSync(file))

  request
    .post(config.server + "/v1/readyapi/executions")
    .query( buildProjectParams() )
    .auth(config.username, config.password)
    .send(recipe)
    .end(function (err, res) {
      console.log("HTTP Response: " + res.status)
      console.log(JSON.stringify(res.body,null,2))
    })
}

function buildRecipeParams() {
  var result = {}

  result.async = config.async || 'false'

  if( config.callback ){
    result.callback = config.callback
  }

  return result
}

function buildProjectParams() {
  var result = buildRecipeParams()

  if( config.testsuite ){
    result.testSuiteName = config.testsuite
  }

  if( config.testcase ){
    result.testCaseName = config.testcase
  }

  if( config.environment ){
    result.environment = config.environment
  }

  return result
}

function listExecutions() {

  request
    .get(config.server + "/v1/readyapi/executions")
    .auth(config.username, config.password)
    .end(function (err, res) {
      console.log("Response: " + res.status)
      console.log("Got response: " + JSON.stringify(res.body))
    })
}

function initConfig() {
  var config = {}

  if (fs.existsSync(program.config)) {
    console.log('Reading config from ' + program.config);
    config = JSON.parse(fs.readFileSync(program.config))
  }

  if (program.username) {
    config.username = program.username
  }

  if (program.password) {
    config.password = program.password
  }

  if (program.server) {
    config.server = program.server
  }

  if( program.async ){
    config.async = program.async
  }

  if( program.environment ){
    config.environment = program.environment
  }

  if( program.testcase ){
    config.testcase = program.testcase
  }

  if( program.testsuite ){
    config.testsuite = program.testsuite
  }

  if( program.callback ){
    config.callback = program.callback
  }

  return config;
}







