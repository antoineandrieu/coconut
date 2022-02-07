//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Bounty {
    address public organization_address;
    string ipfs_cid;

    constructor(address _organization_address, string memory _ipfs_cid) {
        organization_address = _organization_address;
        ipfs_cid = _ipfs_cid;
    }

    function init(address _organization_address, string memory _ipfs_cid)
        external
        payable
    {
        organization_address = _organization_address;
        ipfs_cid = _ipfs_cid;
    }
}
