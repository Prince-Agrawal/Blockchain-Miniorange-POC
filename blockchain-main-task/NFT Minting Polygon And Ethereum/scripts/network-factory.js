const Web3 = require("web3");
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const {METAMASK_PRIVATE_KEY, POLYGON_API_URI, INFURA_API_KEY} = process.env;

/**
 * Factory class used to instantiate deployed contract object based on different networks.
 */
class NetworkFactory{
    constructor(network){
        this.network = network;
    }

    // Return deployed contract instance based on the network.
    async getDeployedContract(){
        try {
            let contract_address=null;
            let api_uri=null;
            if(this.network == "polygon"){
                contract_address = "0xB2Cb9571Fb91bcE3F1b0F51407c27bf1399C70D2";
                api_uri = POLYGON_API_URI;
            }
            else if(this.network == "ethereum"){
                contract_address = "0x9bE9452E8212E68A394D7544abe819E11CE1F548";
                api_uri = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;
            }
            else{
                throw "Network is not valid";
            }

            // Setting web3 provider.
            let web3 = await new Web3(new HDWalletProvider(METAMASK_PRIVATE_KEY, api_uri));

            // Accessing contracts JSON file that will be formed after compiling the smart contract.
            const contract = require("../artifacts/contracts/ExampleNFT.sol/ExampleNFT.json");

            // Creating instance of deployed contract based on the ABI and Contract Address.
            const deployedContract = await new web3.eth.Contract(contract.abi, contract_address);
            return deployedContract;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NetworkFactory;