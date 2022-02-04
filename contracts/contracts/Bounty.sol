//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Bounty {
    address public client_address;
    uint256 award;

    constructor(address _client_address, uint256 _award) payable {
        console.log('Deploying a Bounty from: ', _client_address);
        client_address = _client_address;
        award = _award;
    }

    // use this function instead of the constructor
    // since creation will be done using clone() function
    function init(address _client_address, uint256 _award) external {
        client_address = _client_address;
        console.log('Initializing a Bounty from: ', _client_address);
        award = _award;
        console.log('Award: ', award);
    }
}
