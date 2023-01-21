const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const ipfsClient = require("ipfs-http-client");

const port = 3001;
let parseMultipartData = require('./util')

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


var Ipfs = ipfsClient({host: 'localhost', port: '5001', protocol: 'http'});

/**
 * Welcome Route.
 */
app.get('/', (req, res) => {
  res.send("Welcome to IPFS Server!");
})


/**
 * Route to upload file to ipfs server.
 */
app.post('/uploadFileToIpfs' , async(req , res)=>{
  
  const { fields, files } = await parseMultipartData(req);
  let data = fs.readFileSync(files.file.filepath);
  const cid = await Ipfs.add(data);

  console.log("File upload to IPFS Success: " , cid)
  res.send(cid);
})

/**
 * Route to upload json to ipfs server.
 */
app.post('/uploadJsonToIpfs' , async(req , res)=>{
  let metadataJson = req.body;
  const cid = await Ipfs.add(Buffer.from(JSON.stringify(metadataJson)));
  console.log("Json Uploaded to IPFS success: " , cid)
  res.send(cid);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})