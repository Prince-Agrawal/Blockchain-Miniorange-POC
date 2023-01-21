export const DEPLOYED_CONTRACT_ADDRESS = "0x53b5eB837632058fB13954Ac0321Cd42dfEf7Af0";
export const DEPLOYED_CONTRACT_ABI = [
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
];