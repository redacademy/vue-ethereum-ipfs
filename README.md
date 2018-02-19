# vue-ethereum-ipfs
Web 3.0 Application Starter: Vue front-end, Ethereum / IPFS Backend

Ethereum is a distributed virtual machine that pays eth in return for miners running
your smart contracts. IPFS is a kind of distributed content distribution network. Vue
is a javascript framework for building client-side webapps. By keeping state inside
ethereum and using IPFS to deliver HTML, webapps can become nearly indestructable!

## How do I use this to make indestructable Vue apps that speak Ethereum? 

### Before you start

Install IPFS: [https://ipfs.io/docs/install/](https://ipfs.io/docs/install/) <br/>
Install the MetaMask Ethereum wallet (and register an account): [https://metamask.io/](https://metamask.io/) <br/>
Install: `npm i -g ganache-cli` (local Ethereum test network) <br/>
Install: `npm i -g truffle` (Solidity toolkit!) <br/>

### Obtain your IPFS repo key and set an environment variable
To obtain your key: `ipfs key list -l` <br/>
Set: `export IPFS_PUBKEY=QmQozMTQHW9g6fKmHerVHoKQNQo4zhfXQMsWMTuJ6D1sJd` (Example key)


### Start the local Ethereum test net <br/>
Run: `ganache-cli --accounts=4`


### Connect Metamask to the test net <br/>
Select **Localhost 8545** as your RPC form the MetaMask UI

Use the generated passphrase to log into MetaMask eg:
```
HD Wallet
==================
Mnemonic:      shoe panic long movie sponsor clarify casino stable calm scene enforce federal
```

Import the other accounts in to MetaMask for testing using the generated private key eg:
```
Private Keys
==================
(0) 2f3a3521d79a5e5c58972224d80a678c993a1a50b7cf8a2ee51e255e55fb041d <- the passphrase unlocks this account
(1) 557d2bd6ab422edda5d57a0c20e0908c31c94a3c7c8af40c923925a3403bd214
(2) 76e98c90b7168242fd523b718a76b95966ab09904129c011582369e7339327a8
(3) 683746dee343d96dd792130b01febc0d75dd5a540fae79350db6ed9f597d
```

### Install the Vue packages
```
$ npm install
```

### Vue Build and deploy commands
```
 "scripts": {
    "dev":
      "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
    "build": "export IPFS_PUBKEY= && node build/build.js",
    "publish:ipfs": "npm run test && node build/build.js && node build/ipfs-publish.js"
  },
```

```
$ npm start
Your application is running here: http://localhost:8081
```

### Create Your Own Smart Contracts

The easiest way to start developing Smart Contracts: <br/>
#### [https://remix.ethereum.org/](https://remix.ethereum.org/)

### Add contracts to the Vue App

- Add all of your contracts (.sol files) to the `/contracts` directory
- Run: `truffle compile && truffle migrate --network development`

### Use your Contracts in the App!

Importing contracts is done in `src/web3Service.js` <br/>

Example `web3Service.js`
```
// Replace this with your main contract!
import contractJSON from '../build/contracts/Contract.json'

import contract from 'truffle-contract'
import Web3 from 'web3'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

web3.eth.getAccounts((err, res) => {
  web3.eth.defaultAccount = res[0]
})

const Contract = contract({
  abi: contractJSON.abi,
  binary: contractJSON.bytecode
})

Contract.setProvider(web3.currentProvider)

const saveContract = async c => {
  // https://github.com/trufflesuite/truffle-contract/issues/70
  const newContract = new web3.eth.Contract(contractJSON.abi)

  const createdContract = await newContract
    .deploy({
      data: contractJSON.bytecode,
      arguments: [c.name, c.terms]
    })
    .send({
      from: web3.eth.defaultAccount,
      // Someone help me understand this.
      gas: 5000000,
      gasPrice: '20000000000000'
    })

  createdContract
    .on('error', () => {})
    .on('receipt', () => {})
    .on('confirmation', () => {})

  await getContract(createdContract.options.address)
}

const getContract = async address => {
  const contract = await Contract.at(address)
  
  // Here is your contract instance!
  console.log(contract)
}

export { saveContract }

```

Tested with:

* Node (>=)9.0.0
* go version go1.9.4 darwin/amd64
* ipfs version 0.4.11
* Ganache CLI v6.0.3 (ganache-core: 2.0.2)  
* Google Chrome 64.0.3282.167 (Official Build) (64-bit)

---
### Links
TODO
