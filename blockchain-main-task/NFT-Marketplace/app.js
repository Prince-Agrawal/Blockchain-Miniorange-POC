const express = require("express");
const app = express();
const fs = require("fs");
const solc = require("solc");
const path = require("path");
var cors = require("cors");
const port = 8687;

const fileName = "./Marketplace.json";
const file = require("./Marketplace.json");
app.use(express.static(path.join(__dirname, "build")));

app.use(cors());


// Save the contract address in Marketplace.json file.
app.get("/saveContractAddress", async (req, res) => {
  console.log(req.query.contract_address);
  file.address = req.query.contract_address;

  fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    console.log("writing to " + fileName);
  });
  res.send("Save address to file.");
});


// Reading Marketplace.json file.
app.get("/readNftMarketplaceJson", async (req, res) => {
  
  fs.readFile(fileName, "utf8", function (err, data) {
    // Display the file content

    let resp = JSON.parse(data);
    res.send(resp);
  });
});

// Used to serve build folder when we refresh the code.
app.get("/*", (req, res) => {
  console.log("I am in /* route.......");
  const STATIC = path.join(__dirname, "build");
  const INDEX = path.join(STATIC , "index.html")
  res.sendFile(INDEX);
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
