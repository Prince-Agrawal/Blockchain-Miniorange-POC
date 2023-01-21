require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
require('dotenv').config();
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },

    // for deployment on local  
    // ganache: {
    //   url: process.env.GANACHE_URL,
    //   accounts: [
    //     process.env.GANACHE_PRIVATE_KEY,
    //   ],
    // },

    // mumbai: {
    //   url: process.env.POLYGON_MUMBAI_TESTNET_URL,
    //   accounts: [process.env.POLYGON_MUMBAI_TESTNET_PRIVATE_KEY]
    // },

    // matic: {
    //   url: "https://polygon-mainnet.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d",
      //accounts: [process.env.privateKey]
    // },
    // goerli: {
    //   url: "https://goerli.infura.io/v3/"+process.env.INFURA_API_KRY,
    //   accounts: [ process.env.ETHEREUM_GOERLI_TESTNET_PRIVATE_KEY ]
    // }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};