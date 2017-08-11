This is a test project to build a [DApp](https://ethereum.stackexchange.com/tags/dapp-development/info) based on the [Etherium](https://www.ethereum.org/) Blockchain.

See the running DApp at https://alexmwillis.github.io/open-journal/ (you will need to install MetaMask to interact with the website)

The project uses the following frameworks and technologies
* [Truffle](http://truffleframework.com) - Ethereum development framework
* [Parity](https://parity.io/) - Ethereum client
* [testrpc](https://github.com/ethereumjs/testrpc) - Test Ethereum client
* [MetaMask](https://metamask.io/) (web3.js) - Run DApps in a browser

## Useful Commands

Run Ethereum Clients
* `parity --chain ropsten` - run parity client on Ropsten Test Net
* `testrpc` - run test Ethereum network

Truffle commands
* `truffle migrate --network parity` - publish contacts through parity client
* `truffle watch` - watch contract changes

Dev commands
* `npm run build` - build project
* `npm run dev` - run dev server
* `npm run publish` - publish website


