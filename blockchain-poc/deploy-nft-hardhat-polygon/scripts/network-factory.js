const Web3 = require("web3");
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const {METAMASK_PRIVATE_KEY, POLYGON_API_URI, INFURA_API_KEY} = process.env;

class NetworkFactory{
    constructor(network){
        this.network = network;
    }

    async getDeployedContract(){
        try {
            let contract_address=null;
            let api_uri=null;
            if(this.network == "polygon"){
                contract_address = "0xB2Cb9571Fb91bcE3F1b0F51407c27bf1399C70D2";
                api_uri = POLYGON_API_URI;
            }
            else if(this.network == "ethereum"){
                contract_address = "0xf3146214dDFf192d8A6FF43Ced274687EF681529";
                api_uri = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;
            }
            else{
                throw "Network is not valid";
            }

            let web3 = await new Web3(new HDWalletProvider(METAMASK_PRIVATE_KEY, api_uri));
            const contract = require("../artifacts/contracts/ExampleNFT.sol/ExampleNFT.json");
            const deployedContract = await new web3.eth.Contract(contract.abi, contract_address);
            return deployedContract;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NetworkFactory;