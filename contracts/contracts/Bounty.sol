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
}
