import contractJSON from '../build/contracts/WitnessContract.json'
import contract from 'truffle-contract'
import Web3 from 'web3'

/* eslint-disable */
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getAccounts((err, res) => {                   
  web3.eth.defaultAccount = res[0];
});

const WitnessContract = contract({ 
  abi: contractJSON.abi,  
  binary: contractJSON.bytecode
})

WitnessContract.setProvider(web3.currentProvider)

const saveContract = async (c) => {
  // https://github.com/trufflesuite/truffle-contract/issues/70
  const newContract = new web3.eth.Contract(contractJSON.abi);
  
  const createdContract = await newContract.deploy({
    data: contractJSON.bytecode,
    arguments: [c.name, c.terms]
  }).send({
    from: web3.eth.defaultAccount,
    // Someone help me understand this.
    gas: 5000000,
    gasPrice:'20000000000000'
  })
  // TODO
  createdContract
  .on('error', () =>{})
  .on('receipt', () => {})
  .on('confirmation', () =>{})
 
   await completeContract(createdContract.options.address);
}

const completeContract = async (address) => {
  const contract =  await WitnessContract.at(address);
  console.log(contract)
}

export {
  saveContract
}