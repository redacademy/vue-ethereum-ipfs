var Academy = artifacts.require('Academy')
var Coin = artifacts.require('REDCoin')

module.exports = function(deployer) {
  deployer.deploy(Academy)
  deployer.deploy(Coin)
}
