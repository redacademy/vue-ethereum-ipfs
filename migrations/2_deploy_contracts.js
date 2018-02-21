var ExampleContract = artifacts.require('ExampleContract')

module.exports = function(deployer) {
  deployer.deploy(ExampleContract)
}
