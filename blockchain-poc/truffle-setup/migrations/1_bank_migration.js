const Bank = artifacts.require("bank");

module.exports = function (deployer){
    deployer.deploy(Bank);
}