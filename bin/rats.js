#! /usr/bin/env node
console.log('rats 1.0.0');

var fs = require("fs");
var program = require('commander');
var request = require('superagent');

program
  .version('1.0.0')
  .usage('[options] <recipe ...>')
  .option('-u, --username <usernam>', 'rats username')
  .option('-p, --password <password>', 'rats password')
  .option('-c, --config <config file>', 'config file (defaults to config.json)', 'config.json')
  .option('-s, --server <server>', 'rats server endpoint')
  .parse(process.argv)

if( program.args.length == 0 ){
  program.outputHelp()
  return
}

var config = {}

if( fs.existsSync( program.config )){
  console.log('Reading config from ' +  program.config );
  config = JSON.parse(fs.readFileSync(program.config))
}

if( program.username ){
  config.username = program.username
}

if( program.password ){
  config.password = program.password
}

if( program.server ){
  config.server = program.server
}

console.log( "Using config: " + JSON.stringify(config))

program.args.forEach(function (file) {

  var recipe = JSON.parse( fs.readFileSync( file ))

  request
    .post( config.server + "/v1/readyapi/executions" )
    .query( {async:false} )
    .auth( config.username, config.password )
    .send( recipe )
    .end( function( err, res ){
       console.log( "Response: " + res.status)
       console.log( "Got response: " + JSON.stringify( res.body ))
    })
});









