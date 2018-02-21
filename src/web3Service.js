import contract from 'truffle-contract'
import Web3 from 'web3'

import contractJSON from '../build/contracts/WitnessContract.json'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

const Contract = contract({
  abi: contractJSON.abi,
  binary: contractJSON.bytecode
})

Contract.setProvider(web3.currentProvider)

const getNetIdString = async () => {
  const id = await web3.eth.net.getId()
  switch (id) {
    case '1':
      return 'Main Ethereum Network'
    case '2':
      return 'Morden Test Network (Depricated)'
    case '3':
      return 'Ropsten Test Network'
    case 'loading':
      return undefined
    // Will be some random number when connected locally
    default:
      return 'Local Test Net'
  }
}

const setDefaultWeb3Account = () =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (!err) return resolve(res[0])
      reject(err)
    })
  })

const createContractInstance = async c => {
  // https://github.com/trufflesuite/truffle-contract/issues/70
  const newContract = new web3.eth.Contract(contractJSON.abi)

  const createdContract = await newContract
    .deploy({
      data: contractJSON.bytecode,

      // Contract constructor arguments
      arguments: [c.name, c.terms]
    })
    .send({
      from: web3.eth.defaultAccount,

      // Gas. These are recommended defaults.
      gas: 5000000,
      gasPrice: '20000000000000'
    })

  createdContract
    .on('error', () => {})
    .on('receipt', () => {})
    .on('confirmation', () => {})

  return await Contract.at(createdContract.address)
}

export { createContractInstance, setDefaultWeb3Account, getNetIdString }
