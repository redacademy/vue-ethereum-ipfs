var WitnessContract = artifacts.require('WitnessContract')

module.exports = function(deployer) {
  deployer.deploy(WitnessContract)
}
