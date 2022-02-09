//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Bounty is ERC20 {
    address organization_address;
    string ipfs_cid;
    string status = 'published';
    uint256 reward;

    constructor() ERC20('Bounty', 'BNTY') {}

    function init(address _organization_address, string memory _ipfs_cid)
        external
        payable
    {
        organization_address = _organization_address;
        ipfs_cid = _ipfs_cid;
    }

    function setStatus(string memory _status) external {
        status = _status;
    }

    function getStatus() public view returns (string memory) {
        return status;
    }
}
