/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { METAMASK_PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [METAMASK_PRIVATE_KEY]
    },
    rinkeby : {
      url: "https://rinkeby.infura.io/v3/0b9bec4c3465472b848f0188200271f5",
      accounts: [METAMASK_PRIVATE_KEY]
    },
    sepolia : {
      url: "https://sepolia.infura.io/v3/0b9bec4c3465472b848f0188200271f5",
      accounts: [METAMASK_PRIVATE_KEY]
    },
  },
  solidity: "0.8.12",
}