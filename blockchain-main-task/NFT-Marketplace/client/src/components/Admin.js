import { useEffect, useState } from "react";
import Web3 from "web3";
import { useLocation } from "react-router";
import axios from "axios";
import NFTMarketplace from "./NFTMarketplace.json";

const BASE_URL = "http://localhost:8687/";

export default function AdminPannel() {
  const [formParams, updateFormParams] = useState({
    network_url: "",
    private_key: "",
  });
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("bg-red-500");
    ethereumButton.classList.add("bg-green-500");
  }

  // Function for connecting metamask wallet.
  async function connectWebsite() {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        // updateButton();
        console.log("here");
        toggleConnect(true);
        // getAddress();
        
      });
  }

  async function deployContract(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);

    const ABI = NFTMarketplace.abi;
    const bytecode = NFTMarketplace.bytecode;

    const contract = new web3.eth.Contract(ABI);
    web3.eth.getAccounts().then((accounts) => {
      // Display all Ganache Accounts
      console.log("Accounts:", accounts);

      let mainAccount = accounts[0];

      // address that will deploy smart contract
      // console.log("Default Account:", mainAccount);
      contract
        .deploy({ data: bytecode })
        .send({ from: mainAccount, gas: 4700000 })
        .on("receipt", async (receipt) => {
          // Contract Address will be returned here
          console.log("Contract Address:", receipt.contractAddress);
          const res = await axios.get(
            BASE_URL +
              "saveContractAddress?contract_address=" +
              receipt.contractAddress
          );
        })
        .then((initialContract) => {
          console.log("done....");
          alert("Marketplace setup success.");
          window.location.replace(location.pathname)
        });
    });
  }

  // Used for checking if wallet is connected or not.
  useEffect(() => {
    let val = window.ethereum.isConnected();
    console.log("val....", val);
    if (val) {
      console.log("here");
      toggleConnect(val);
    //   updateButton();
    }
  });

  return (
    <div>
      {/* <div style={{marginLeft: "1400px" , marginTop: "20px" , marginBottom: "20px"}}>
        <button type="button" class="btn btn-success" onClick={connectWebsite}>{connected ? "Connected" : "Connect Wallet"}</button>
      </div> */}

      <div className="row" id="nftForm">
        <form className="bg-white">
          <h3 className="text-center font-bold" style={{marginTop: "20px"}}>
            Welcome to miniorange NFT Market Place
          </h3>

          <div className="text-green text-center">
          <div className="text-green text-center">Miniorange NFT marketplace maker</div>
          </div>

          <div style={{marginLeft: "680px" , marginTop:"10px" , marginBottom: "20px"}}>
            <button onClick={deployContract} className="btn btn-primary">
              Setup your MarketPlace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
