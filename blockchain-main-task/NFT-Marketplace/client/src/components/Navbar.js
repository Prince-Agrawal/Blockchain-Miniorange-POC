import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useLocation } from "react-router";

export default function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  // Function for connecting metamask wallet.
  async function connectWebsite() {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        // updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  // Used for checking if wallet is connected or not.
  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      // updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  console.log("started.........")
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.href === window.location.href) {
      console.log(link)
      link.classList.add('active')
    }
  });
  console.log("ended.........")

  return (
    <div class="container-fluid">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light mt-2">
          <Link to="/">
            <div class="navbar-brand h-color logo">
              <img
                className="logo-image"
                src="https://mo-nft-marketplace.s3.amazonaws.com/miniorange-logo.webp"
              />
            </div>
          </Link>
          <form class="d-flex mo-search-form">
            <input
              class="form-control me-2 mo-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
          </form>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mo-nav">
              <li class="nav-item mr-30">
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="nav-link p-color"
                >
                  Marketplace
                </Link>
              </li>
              <li class="nav-item mr-30">
                <Link
                  to="/sellNFT"
                  style={{ textDecoration: "none" }}
                  className="nav-link p-color"
                >
                  List NFT
                </Link>
              </li>
              <li class="nav-item mr-30">
                <Link
                  to="/profile"
                  style={{ textDecoration: "none" }}
                  className="nav-link p-color"
                >
                  Profile
                </Link>
              </li>
            </ul>
            <button
              type="button"
              class="btn btn-primary nav-btn fr"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </nav>
      </div>{" "}
      <hr style={{ color: "white" }} />
    </div>
  );
}
