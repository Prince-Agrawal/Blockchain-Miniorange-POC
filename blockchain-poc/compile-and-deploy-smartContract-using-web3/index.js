const express = require('express')
const Web3 = require('web3');
const app = express()
const port = 3000

const web3 = new Web3("https://rinkeby.infura.io/v3/0b9bec4c3465472b848f0188200271f5");
// var web3 = new Web3();
// window.web3 = new Web3(web3.currentProvider);

const address = "0x1715f4EC3A74027C661E4954FA7E0E7a78e4EB1e";

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "bal",
				"type": "uint256"
			}
		],
		"name": "depositBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bal",
				"type": "uint256"
			}
		],
		"name": "withdrawBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, address);

    // calling depositBalance method from smart contract

    // web3.eth.getAccounts().then(accounts => {
    //     let acc = accounts[0];
    //     console.log(acc);
    //     return contract.methods.depositBalance(100).send({from: acc});
    // }).then(tx => {
    //     console.log("Transactions...... ", tx);
    // }).catch(e => {
    //     console.log("Transaction errors......." , e);
    // })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})