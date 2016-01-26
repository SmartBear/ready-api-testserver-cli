#! /usr/bin/env node
console.log('rats 1.0.0');

var fs = require("fs");
var program = require('commander');
var request = require('superagent');

program
  .version('1.0.0')
  .usage('[options] <recipe ...>')
  .option('-u, --username <usernam>', 'Ready! API TestServer username')
  .option('-p, --password <password>', 'Ready! API TestServer password')
  .option('-c, --config <config file>', 'Config file (defaults to config.json)', 'config.json')
  .option('-s, --server <server>', 'Ready! API TestServer endpoint')
  .parse(process.argv)

if( program.args.length == 0 ){
  program.outputHelp()
  return
}

var config = initConfig();
console.log( "Using config: " + JSON.stringify(config))

program.args.forEach(function (file) {

  if( file.substr( file.length-4).toLowerCase() == ".xml" ){
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
    .query({async: false})
    .auth(config.username, config.password)
    .type( 'application/xml')
    .send( project )
    .end(function (err, res) {
      console.log("Response: " + res.status)
      console.log("Got project response: " + JSON.stringify(res.body))
    })
}

function sendRecipeRequest(file) {
  var recipe = JSON.parse(fs.readFileSync(file))

  request
    .post(config.server + "/v1/readyapi/executions")
    .query({async: false})
    .auth(config.username, config.password)
    .send(recipe)
    .end(function (err, res) {
      console.log("Response: " + res.status)
      console.log("Got response: " + JSON.stringify(res.body))
    })
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
  return config;
}







