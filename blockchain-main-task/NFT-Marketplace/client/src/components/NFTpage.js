import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
// import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { BASE_URL_SERVER } from "../BaseUrl";

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");


  // Function to get NFT data associated for a token ID.
  async function getNFTData(tokenId) {
    let resp = await axios.get(BASE_URL_SERVER)
    // MarketplaceJSON = resp.data 
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      resp.data.address,
      resp.data.abi,
      signer
    );
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };

    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
  }

  // Function called when user buy NFT.
  async function buyNFT(tokenId) {
    try {
      let resp = await axios.get(BASE_URL_SERVER)
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        resp.data.address,
        resp.data.abi,
        signer
      );
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Transaction cancelled");
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container my-5" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-6">
            <img
              src={data.image}
              className="nft-image"
              alt="..."
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="col-6">
            <div className="row">
              <p className="w-font mo-subheading">HONEST TREND</p>
            </div>
            <div className="row">
              <div className="col-6">
                <h3 className="w-font"> {data.name}</h3>
              </div>
              <div className="col-6">
                {/* <h4 className="w-font">3592 ETH</h4> */}
              </div>
            </div>
            <div class="card product-card">
              <div class="card-body">
                <h4 class="card-title h-color mb-3 text-center sub-text">
                  Current Price
                </h4>
                <h2 class="card-subtitle mb-3 text-muted text-center main-price">
                  {data.price} ETH
                </h2>
                {/* <h4 class="card-title h-color text-center sub-price">
                  $2,767.77
                </h4> */}
                <p class="card-text p-color text-justify mt-3 product-description">
                  {data.description}
                </p>
                <hr style={{ color: "white" }} />
                

                <div>
                    { currAddress == data.owner || currAddress == data.seller ?
                        <h4 className="r-color text-center">You are the owner of this NFT</h4>
                        : <button
                        type="button"
                        className="btn btn-primary action-button mt-4"
                        onClick={() => buyNFT(tokenId)}
                      >
                        Buy this NFT
                      </button>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>

                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
