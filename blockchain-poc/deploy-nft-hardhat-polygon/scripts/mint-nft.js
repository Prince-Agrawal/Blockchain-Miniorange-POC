let NetworkFactory = require('./network-factory');

const METADATA_URI = "ipfs://bafyreiesbkaa4bphh3pb2qemhlupb7si457gjz4octoubqulnvejdugq34/metadata.json";
const {METAMASK_WALLET_ADDRESS} = process.env;

async function mintNft(to_Address , metadata_uri){
    try {
        let networkFactory = new NetworkFactory("ethereum");
        // let networkFactory = new NetworkFactory("polygon");

        let deployedContract = await networkFactory.getDeployedContract();
      
        // let data = await deployedContract.methods.mintNFT(to_Address , metadata_uri).send({from: METAMASK_WALLET_ADDRESS})
        // console.log(data);

        // let owner_address = await deployedContract.methods.ownerOf(3).call();
        let balance_of_data = await deployedContract.methods.balanceOf(to_Address).call();
        // let tokenURI_data = await deployedContract.methods.tokenURI(1).call();

        console.log(balance_of_data);
    } catch (error) {
        console.log(error);
    }
  }
  
  mintNft("0x20e099B5AF87a8a2184d7F4C791A7dC297C2F007" , METADATA_URI);