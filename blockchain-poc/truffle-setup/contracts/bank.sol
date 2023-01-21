// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract Bank
{
    uint amount;

    constructor()
    {
        amount=100;
    }

    function getBalance() view public returns(uint)
    {
        return amount;
    }

    function depositBalance(uint bal) public
    {
        amount = amount+bal;
    }

    function withdrawBalance(uint bal) public
    {
        amount = amount-bal;
    }
}