# NFT Minting On Different Networks

This is a basic project to get you started writing and compiling contract and also minting NFT's to the different networks (polygon, ethereum etc).

Hardhat is an Ethereum development environment for professionals. It facilitates performing frequent tasks, such as running tests, automatically checking code for mistakes or interacting with a smart contract. Check out the plugin list to use it with your existing tools.


## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ npm install
```

### Hardhat Installation

Install hardhat as dev dependency:

```sh
$ npm install --save-dev hardhat
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ npm run compile
```

### Deploy contract to netowrk (requires Mnemonic and infura API key)

```
npx hardhat run --network rinkeby ./scripts/deploy-contract.js
```

## Project Structure:

- **contracts** folder will contains all the solidity contract files. When we run compile command it will automatically check all the files present in the **contracts** folder.

- **scripts** folder will containes all the scripts.


### Added plugins

- Gas reporter [hardhat-gas-reporter](https://hardhat.org/plugins/hardhat-gas-reporter.html)
- Etherscan [hardhat-etherscan](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

## Thanks

If you like it than you shoulda put a start ⭐ on it

## License

MIT