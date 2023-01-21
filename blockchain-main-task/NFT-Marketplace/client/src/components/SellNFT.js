import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../util/Ipfs-file-upload";
// import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import { BASE_URL_SERVER } from "../BaseUrl";
import axios from "axios";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const [dataFetched, updateFetched] = useState(false);
  const location = useLocation();
  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    updateMessage("Please wait...");
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
        updateMessage("");
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  // This function list NFT.
  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      updateMessage("Please wait...");
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let resp = await axios.get(BASE_URL_SERVER)
      let Marketplace = resp.data;

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  console.log("Working", process.env);
  if (!dataFetched) updateFetched(true);

  return (
    <div>
      <Navbar></Navbar>
      <div class="container my-5" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-6 offset-3">
            <form className="nft-form">
              <div className="mb-4">
                <h3 className="h-color">Upload your NFT to the marketplace</h3>
              </div>
              <div class="mb-4">
                <label for="name" class="form-label">
                  NFT Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Axie#4563"
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                  value={formParams.name}
                />
              </div>
              <div class="mb-4">
                <label for="description" class="form-label">
                  NFT Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Axie Infinity Collection"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, description: e.target.value })
                  }
                />
              </div>
              <div class="mb-4">
                <label for="price" class="form-label">
                  Price (in ETH)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="Min 0.01 ETH"
                  value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
                />
              </div>
              <div className="row">
                <label for="image" className="mb-2">
                  Upload Image
                </label>
                <input className="file-upload" type={"file"} onChange={OnChangeFile}></input>
              </div>
              <div className="mt-4 row">
                <button
                onClick={listNFT}
                  type="submit"
                  class="btn btn-primary action-button mt-4"
                >
                  List NFT
                </button>
              </div>
              <div className="text-green text-center r-color">{message}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
