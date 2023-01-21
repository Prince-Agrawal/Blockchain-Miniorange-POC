import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function NFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };
  return (
    <div class="card-dark card card-hover" id="card-hover">
      <Link to={newTo} style={{ textDecoration: "none" }}>
        <div className="image-box">
          <img
            class="card-img-top img-card"
            src={data.data.image}
            alt="Card image cap"
          ></img>
        </div>
        <div class="card-body">
          <h5 class="card-title h-color">{data.data.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{data.data.price} ether</h6>
          {/* <p class="card-text p-color text-justify">{data.data.description}</p> */}
          <hr style={{ color: "white" }} />
          <p className="price">
            {data.data.price} ETH
            <span className="inline-display">
              <p className="p-color fr">1 of 20</p>
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NFTTile;
