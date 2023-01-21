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

// console.log(output);

var abi = output.contracts['bank.sol']["Bank"].abi;
var bytecode = output.contracts['bank.sol']["Bank"].evm.bytecode.object;

console.log("ABI: " , abi);
console.log("ByteCode: ", bytecode);

async function getAccountAddress(){
    try{
        let accountList = await web3.eth.getAccounts()
        return accountList[0];
    }catch(e){
        console.log("error in getting acount " , e);
    }
}

async function deployContract(address){
    try{
        let contract = new web3.eth.Contract(abi);
        let _deployedContract = await contract
            .deploy({ data: bytecode })
            .send({ from: address, gas: 470000 });
        return _deployedContract;

    }catch(e){
        console.log("Error: " , e);
    }
}

async function callGetAccountBalanceFunction(_deployedContract){
    try {
        let _data = await _deployedContract.methods.getBalance().call();
        console.log("Initial Value: ", _data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function func(){
    try {
        defaultAccount = await getAccountAddress();
        let deployedContract = await deployContract(defaultAccount);
        console.log("Deployed Contract Address ", deployedContract._address);
        await callGetAccountBalanceFunction(deployedContract);
    } catch (error) {
        console.log(error);
    }
}

func();


