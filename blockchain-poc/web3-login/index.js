const express = require('express');
const Web3 = require('web3');
const path = require('path');
const cors = require('cors');
const EthUtil = require('ethereumjs-util')
const EthTx = require('ethereumjs-tx').Transaction
const app = express()
const port = 3000

app.use(cors())

const fileName = path.join(__dirname, "index.html");

app.get('/', (req, res) => {
  res.sendFile(fileName);
})

app.post('/login', (req, res) => {
    res.json({
        message: "Hello"
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})