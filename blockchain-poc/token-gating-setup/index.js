const express = require('express')
const path = require('path')
const Web3 = require('web3');
const app = express()
const port = 3000

const web3 = new Web3(Web3.givenProvider);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'index.html'))
})

app.get('/secret' , async (req, res) => {
    
    const signature = req.query.signature;
    console.log("Signature: " , signature);
    let accountList = await web3.eth.getAccounts()
    const address = await web3.eth.accounts.recover("Message to sign" , signature);
    console.log("Address: " , address);
    res.json({message: "SECRET MESSAGE"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})