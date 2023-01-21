import React from "react";
import Web3 from "web3";

import { ReactDOM } from "react";

const Demo = ()=>{

    async function loginWithMetamask(){
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // window.web3.currentProvider
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        let message = "Some string";
        let hash = await web3.utils.sha3(message);
        let signature = await web3.eth.personal.sign(hash , accounts[0]);
        let signing_address = await web3.eth.accounts.recover(hash, signature);
        console.log("Signature: " , signature);
        console.log("Signing address: " , signing_address);
        // alert(accounts);
        
        // para.innerHTML = "Hello, inner html works!"
        let paraDOM = document.getElementById('metamaskAccountAddress');
        let buttonDom = document.getElementById('loginWithMetamask');
        if(accounts[0] === signing_address){
            let loginDetails = "Welcome You are login"
            paraDOM.innerText = loginDetails;
            buttonDom.innerHTML = accounts[0];
        }
    };


    return (
        <div>
            <button type="button" class="btn btn-primary" id="loginWithMetamask" onClick={loginWithMetamask}>Login with metamask</button>
            <p id="metamaskAccountAddress" ></p>
        </div>
    )
}

export default Demo;