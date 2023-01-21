const solc = require('solc');
const fs = require('fs');

// web3 interface
const Web3 = require("web3");
const path = require('path');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = "e1a03290c1dc7c55a551e161e9fa5ccde9b28aa06c13c35f08eb625754ffaed8";

// setup a http provider
let web3 = new Web3(new HDWalletProvider(MNEMONIC, `https://polygon-mumbai.g.alchemy.com/v2/GYH5S02LrvOwaZUG6Hbe-jCuImjJ1IkO`));

// let fileContent = fs.readFileSync(path.join(__dirname , "contracts", "myNFT.sol")).toString();
// // let fileContent = fs.readFileSync(path.join(__dirname ,  "bank.sol")).toString();

// // input formate for compiling
// var input = {
//     language: 'Solidity',
//     sources: {
//       'myNFT.sol': {
//         content: fileContent
//       }
//     },
//     settings: {
//       outputSelection: {
//         '*': {
//           '*': ['*']
//         }
//       }
//     }
//   };

// //convert output to JSON
// var output = JSON.parse(solc.compile(JSON.stringify(input)));

// console.log(output);

// var abi = output.contracts['bank.sol']["Bank"].abi;
// var bytecode = output.contracts['bank.sol']["Bank"].evm.bytecode.object;

// console.log("ABI: " , abi);
// console.log("ByteCode: ", bytecode);

//using remix
const contractAddress = "0x0A147349083d9675F86F7ddE5c0fD94db3Ab6Cf5";
const abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxSupply",
				"type": "uint256"
			}
		],
		"name": "setMaxSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleIsMinitEnabled",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "tranferToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isMintEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "mintedWallets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// deployment using truffle
// const contractAddress = "0x40a9D0F43017cA82A8EFdc76AF4BeAD5521050BB";
// const abi = [
//   {
//     "inputs": [],
//     "stateMutability": "payable",
//     "type": "constructor",
//     "payable": true
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "bool",
//         "name": "approved",
//         "type": "bool"
//       }
//     ],
//     "name": "ApprovalForAll",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "previousOwner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnershipTransferred",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "getApproved",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       }
//     ],
//     "name": "isApprovedForAll",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "isMintEnabled",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "maxSupply",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "mintPrice",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "mintedWallets",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "ownerOf",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "renounceOwnership",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "safeTransferFrom",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bytes",
//         "name": "data",
//         "type": "bytes"
//       }
//     ],
//     "name": "safeTransferFrom",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "internalType": "bool",
//         "name": "approved",
//         "type": "bool"
//       }
//     ],
//     "name": "setApprovalForAll",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes4",
//         "name": "interfaceId",
//         "type": "bytes4"
//       }
//     ],
//     "name": "supportsInterface",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "symbol",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "tokenURI",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "toggleIsMinitEnabled",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_maxSupply",
//         "type": "uint256"
//       }
//     ],
//     "name": "setMaxSupply",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "mint",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function",
//     "payable": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_tokenId",
//         "type": "uint256"
//       }
//     ],
//     "name": "tranferToken",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]
const contract = new web3.eth.Contract(abi, contractAddress);


async function func(){
  try {
      // let data = await contract.methods.ownerOf(1).call();
      let data = await contract.methods.toggleIsMinitEnabled().send({from: "0x20e099B5AF87a8a2184d7F4C791A7dC297C2F007"})
      console.log(data);
  } catch (error) {
      console.log(error);
  }
}

func();

