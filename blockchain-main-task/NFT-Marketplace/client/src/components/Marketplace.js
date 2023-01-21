import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
// import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminPannel from "./Admin";
import { BASE_URL_SERVER } from "../BaseUrl";

export default function Marketplace() {
  const [data, updateData] = useState([]);
  const [isLogin , updateIsLogin] = useState(false);
  const [dataFetched, updateFetched] = useState(false);
  const [MarketplaceJSON, updateMarketplaceJSON] = useState({});
  // Function for fetching all the NFT'S related to a contract.
  async function getAllNFTs() {
    try {
      let resp = await axios.get(BASE_URL_SERVER);
      // updateMarketplaceJSON(resp.data);
      // MarketplaceJSON = resp.data
      if (resp.data.address == null) {
        updateFetched(true);
        return;
      }
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
      //create an NFT Token
      let transaction = await contract.getAllNFTs();

      //Fetch all the details of every NFT from the contract and display
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
          console.log("ddddddddddddddddddd", item);
          return item;
        })
      );

      updateFetched(true);
      updateData(items);
      updateMarketplaceJSON(resp.data);
    } catch (error) {
      console.log("Erro in Marketplace.js page:   ", error);
    }
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <Navbar></Navbar>
      {
        dataFetched ? (
          <div>
            {MarketplaceJSON.address ? (
              <div>
                <div className="container-fluid">
                  <div className="container p-0">
                    <div className="row" style={{ marginTop: "15px" }}>
                      {data.map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>;
                      })}
                      <div className="mt-10 text-xl" style={{ color: "white" }}>
                        {data.length == 0 ? "Nothing is availiable to display." : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              
              <AdminPannel />
            )}
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}
