// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNft is ERC721, Ownable{
    uint public mintPrice = 0.001 ether;
    uint public totalSupply;
    uint public maxSupply;
    bool public isMintEnabled;
    mapping(address => uint) public mintedWallets;

    constructor() payable ERC721('Prince Mint', 'PRINCEMINT'){
        maxSupply=2;
    }

    function toggleIsMinitEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    function setMaxSupply(uint _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

    function mint() external payable {
        require(isMintEnabled, 'minting not enabled');
        require(mintedWallets[msg.sender] < 1 , 'exceeds max per wallet');
        require(msg.value == mintPrice, 'wrong value');
        require(maxSupply > totalSupply , 'sold out');

        mintedWallets[msg.sender]++;
        totalSupply++;
        uint tokenId = totalSupply;
        _safeMint(msg.sender, tokenId);
    }

    function tranferToken(address _from , address _to , uint _tokenId) external{
        _transfer(_from , _to , _tokenId);
    }

}
