let NetworkFactory = require('./network-factory');

const METADATA_URI = "ipfs://bafyreiesbkaa4bphh3pb2qemhlupb7si457gjz4octoubqulnvejdugq34/metadata.json";
const {METAMASK_WALLET_ADDRESS} = process.env;


/**
 * Function used to mint on the based of network that is provided.
 */
async function mintNft(network_name , to_Address){
    try {

        // Initialising Network Factory.
        let networkFactory = new NetworkFactory(network_name);

        // Creating deployed contract instance.
        let deployedContract = await networkFactory.getDeployedContract();
      
        // calling mintNFT Function of contract.
        let data = await deployedContract.methods.mintNFT(to_Address , METADATA_URI).send({from: METAMASK_WALLET_ADDRESS})
        return data;

    } catch (error) {
        console.log(error);
    }
  }


/**
 * Check number of NFT that holds by a perticular address.
 */
async function balanceOf(network_name , to_Address){
    try {

        // Initialising Network Factory.
        let networkFactory = new NetworkFactory(network_name);

        // Creating deployed contract instance.
        let deployedContract = await networkFactory.getDeployedContract();

        // getting total number of tokens for a given address.
        let balance_of_data = await deployedContract.methods.balanceOf(to_Address).call();
        return balance_of_data;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    mintNft,
    balanceOf
}