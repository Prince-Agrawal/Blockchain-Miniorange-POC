const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express();
const port = 3000
const { mintNft, balanceOf } = require('./scripts/mint-nft');

app.use(cors())


/**
 * Rendering index.html file
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , 'index.html'))
})


/**
 * This route will be called when user clicks on the button Mint NFT.
 */
app.get('/mintNft' , async (req , res)=>{
    let network_name = req.query.network;
    let wallet_address = req.query.walletAddress;

    let mint_Nft_Data = await mintNft(network_name , wallet_address);
    console.log("Minting NFT DATA ..................................................");
    console.log(mint_Nft_Data);
    console.log('-------------------------------------------------');
    res.send(mint_Nft_Data.blockHash)
})


/**
 * This route will be called when user clicks on the button Balnce Of.
 */
app.get('/balanceOf' , async (req , res)=>{
    let network_name = req.query.network;
    let wallet_address = req.query.walletAddress;

    let balance_of_data = await balanceOf(network_name , wallet_address);
    console.log("Balance Of Response .................................................")
    console.log(balance_of_data);
    console.log('-------------------------------------------------');
    res.send(balance_of_data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})