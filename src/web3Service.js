import contractJSON from '../build/contracts/ExampleContract.json'
import contract from 'truffle-contract'

const Contract = contract({
  abi: contractJSON.abi,
  binary: contractJSON.bytecode
})

Contract.setProvider(web3.currentProvider)

const setDefaultWeb3Account = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (!err) return resolve(res[0])
      reject(err)
    })
  })
}

const createContractInstance = async c => {
  // https://github.com/trufflesuite/truffle-contract/issues/70
  const newContract = new web3.eth.Contract(contractJSON.abi)

  const createdContract = await newContract
    .deploy({
      data: contractJSON.bytecode,

      // If your contract has constructor parameters, pass them here.
      arguments: [c.greeting]
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

export { createContractInstance, setDefaultWeb3Account }
