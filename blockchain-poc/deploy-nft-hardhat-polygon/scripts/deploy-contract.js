async function deployContract() {
    const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
    const exampleNFT = await ExampleNFT.deploy()
    await exampleNFT.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = exampleNFT.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
   }
   
   deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

    // Contract deployed to address ploygon: 0xB2Cb9571Fb91bcE3F1b0F51407c27bf1399C70D2
    // https://polygon-mumbai.g.alchemy.com/v2/GYH5S02LrvOwaZUG6Hbe-jCuImjJ1IkO

    // Contract deployed to address Rinkby: 0xf3146214dDFf192d8A6FF43Ced274687EF681529