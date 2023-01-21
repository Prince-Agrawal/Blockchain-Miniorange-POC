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

### Run the DApp Locally
#### Open new terminal window and clone this repository
```
git clone https://bitbucket.org/miniorange/blockchain/src/master/Sample%20Projects/NFT-Marketplace/
```
#### Install Server dependencies
```
npm install
```

#### Install Client dependencies
```
cd client && npm install
```
#### Start DApp
```
npm start
```

If you want to change the port of client from 3000 to custom port then create .env file in client folder and specify PORT=80.
