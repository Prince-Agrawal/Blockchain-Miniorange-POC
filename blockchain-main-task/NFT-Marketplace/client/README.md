# NFT Marketplace
<i>NFT marketplace DApp where users mint NFT, Buy NFT and Sell NFT.</i>
#

### Features
- Mint and list token on marketplace.
- Sell tokens on the marketplace.
- Buy tokens on the marketplace.
- Keeps track of all the tokens owned by an account - minted and bought.
- Set desired token price.
- Query blockchain for token owner and token metadata.
#
### Stack
- [Solidity](https://docs.soliditylang.org/en/v0.7.6/) - Object-oriented, high-level language for implementing smart contracts.
- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [ether.js](https://docs.ethers.io/v5/) - Allows users to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [Hardhat](hhttps://hardhat.org/docs) - Development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- [Ganache](https://www.trufflesuite.com/ganache) - Personal blockchain for Ethereum development used to deploy contracts, develop DApps, and run tests.
#
### Prerequisites to run locally.
- Locally ganache setup.
- Setup IPFS node locally [docs](https://docs.google.com/document/d/1tyOZYrArU4DGvw7kfbCuKlfpewCZCnUNBZ_kFZjuNvg/edit).
- Connect metamask browser wallet to Ganache Local Network.
- Access NFT Marketplace DApp at and start minting your NFT's.
#
### Run the DApp Locally
#### Install truffle
```
npm install -g hardhat
```
#### Open new terminal window and clone this repository
```
git clone https://bitbucket.org/miniorange/blockchain/src/master/Sample%20Projects/NFT-Marketplace/
```
#### Install dependencies
```
npm install
```
#### Compile smart contract
```
hardhat compile
```
#### Deploy smart contract to ganache
```
hardhat run --network ganache ./scripts/deploy
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to Localhost 7545.
- Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.
