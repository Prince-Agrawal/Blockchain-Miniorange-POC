import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
// import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import { BASE_URL_SERVER } from "../BaseUrl";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  // Function to get NFT's that user own's.
  async function getNFTData(tokenId) {
    try {
      let resp = await axios.get(BASE_URL_SERVER)
      // MarketplaceJSON = resp.data 
      const ethers = require("ethers");
      let sumPrice = 0;
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
      let transaction = await contract.getMyNFTs();

      /*
       * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
       * and creates an object of information that is to be displayed
       */

      const items = await Promise.all(
        transaction.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          let meta = await axios.get(tokenURI);
          meta = meta.data;

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
          sumPrice += Number(price);
          return item;
        })
      );

      updateData(items);
      updateFetched(true);
      updateAddress(addr);
      updateTotalPrice(sumPrice.toPrecision(3));
    } catch (error) {
      console.log("Error in Profile.js:    ", error);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="profileClass" style={{ "min-height": "100vh" }}>
      <Navbar></Navbar>
      <div className="profileClass">
        <div className="row">
          <div
            className="flex text-center flex-col mt-11 md:text-2xl"
            style={{ color: "white" }}
          >
            <div className="mb-5">
              <h2 className="font-bold">Wallet Address</h2>
              {address}
            </div>
          </div>
        </div>

        <div
          className="flex flex-row text-center justify-center mt-10 md:text-2xl"
          style={{ color: "white" }}
        >
          <div>
            <h2 className="font-bold">No. of NFTs</h2>
            {data.length}
          </div>
          <div className="ml-20">
            <h2 className="font-bold">Total Value</h2>
            {totalPrice} ETH
          </div>
        </div>

        <div className="container-fluid">
          <div className="container p-0">
            <div className="row" style={{ color: "white" }}>
              <h2>Your NFTs</h2>
            </div>
            <div className="row" style={{ marginTop: "15px" }}>
              {data.map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}