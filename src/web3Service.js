import Web3 from 'web3'
import contract from 'truffle-contract'

import contractJSON from '../build/contracts/WitnessContract.json'
const Contract = contract(contractJSON)

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
  Contract.setProvider(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  Contract.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))
}

const NETWORKS = {
  '1': 'Main Net',
  '2': 'Deprecated Morden test network',
  '3': 'Ropsten test network',
  '4': 'Rinkeby test network',
  '42': 'Kovan test network'
}

const getNetIdString = async () => {
  const id = await web3.eth.net.getId()
  if (typeof id === 'number') {
    return NETWORKS[id] || 'Truffle Test Network'
  } else {
    return ''
  }
}

const getEthWallets = () =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (!err) return resolve(res)
      reject(err)
    })
  })

const createContractInstance = async c => {
  try {
    const newContract = await Contract.new(c.name, c.terms, {
      from: c.witness,
      gasPrice: 2000000000,
      gas: '2000000'
    })
    return newContract
  } catch (e) {
    console.log(e, 'Error creating contract...')
    return undefined
  }
}

export { createContractInstance, getEthWallets, getNetIdString }
