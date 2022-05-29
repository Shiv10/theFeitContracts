// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

contract TheFeit {
    mapping(uint256 => uint256) public directory;

    function getProduct (uint256 serialNumber) public view returns(uint256) {
        return directory[serialNumber];
    }

    function setProduct (uint256 serialNumber, uint256 userPho) public {
        directory[serialNumber] = userPho;
    }
}