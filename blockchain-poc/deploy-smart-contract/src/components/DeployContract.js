import { ethers } from 'ethers';
import Web3 from 'web3';

export default function DeployContract(){
    async function handleConnect(){
        const {ethereum} = window;
        if(!ethereum){
            alert("Please install metamask first!");
            return;
        }
        try {
            // console.log("Exist")
            // let accounts = await ethereum.request( { method: 'eth_requestAccounts'} )
            // console.log(accounts[0]);
            // const provider = new ethers.providers.Web3Provider(ethereum);
            // const signer = provider.getSigner();
            // const account = await signer.connect(provider);
            // // const add = await signer.getAddress();
            // console.log("signer: " , account);
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            // MetaMask requires requesting permission to connect users accounts
            await provider.send("eth_requestAccounts", []);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner()

            const web3 = new Web3(window.ethereum);

            const ABI = [
                {
                    "inputs": [],
                    "name": "retrieve",
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
                            "name": "num",
                            "type": "uint256"
                        }
                    ],
                    "name": "store",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
            const bytecode = "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220522334dfd7decc643eeb644e28d6d7f11bae5f5b74d14e33980a35d12bc7771f64736f6c63430008110033"
            const contract = new web3.eth.Contract(ABI);
            web3.eth.getAccounts().then((accounts) => {
                // Display all Ganache Accounts
                console.log("Accounts:", accounts);
              
                let mainAccount = accounts[0];
              
                // address that will deploy smart contract
                console.log("Default Account:", mainAccount);
                contract
                    .deploy({ data: bytecode })
                    .send({ from: mainAccount, gas: 470000 })
                    .on("receipt", (receipt) => {
              
                        // Contract Address will be returned here
                        console.log("Contract Address:", receipt.contractAddress);
                    })
                    .then((initialContract) => {
                        initialContract.methods.message().call((err, data) => {
                            console.log("Initial Data:", data);
                        });
                    });
            });
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <button onClick={handleConnect}>Connect</button>
    )
}