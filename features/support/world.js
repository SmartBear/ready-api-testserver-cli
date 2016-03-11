
function World() {
  this.testStep = { type:"REST Request", assertions: [], parameters:[]}
  this.recipe = { "testSteps":[this.testStep]}

  this.username = "demoUser"
  this.password = "demoPassword"
  this.server = "http://testserver.readyapi.io:8080"
}

module.exports = function() {
  this.World = World;
};
