const MyNFT = artifacts.require("myNFT");

module.exports = function (deployer){
    deployer.deploy(MyNFT);
}