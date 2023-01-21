const solc = require('solc');
const fs = require('fs');

// web3 interface
const Web3 = require("web3");

// setup a http provider
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let fileContent = fs.readFileSync("bank.sol").toString();

// input formate for compiling
var input = {
    language: 'Solidity',
    sources: {
      'bank.sol': {
        content: fileContent
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  
//convert output to JSON
var output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);

var abi = output.contracts['bank.sol']["Bank"].abi;
var bytecode = output.contracts['bank.sol']["Bank"].evm.bytecode.object;

console.log("ABI: " , abi);
console.log("ByteCode: ", bytecode);

let contract = new web3.eth.Contract(abi);
let defaultAccount;

// deploying contract on Ganache
let smartContactAddress;
web3.eth.getAccounts().then((accounts)=>{
    // console.log("Acounts........." , accounts);
    defaultAccount = accounts[0];
    contract
        .deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 470000 })
        .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
        console.log("Contract Address:", receipt.contractAddress);
        })
        .then((demoContract) => {
            demoContract.methods.getBalance().call((err, data) => {
              console.log("Initial Value:", data);
            });
        });
})




