//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import './Bounty.sol';

contract BountySubmission {
    address bounty;
    bool reviewed;
    bool is_valid;
    string notes;
    address hunter_address;

    constructor(address _bounty) {
        bounty = _bounty;
    }

    function validateSubmission() external {
        Bounty bountyContract = Bounty(bounty);
        bountyContract.setStatus('resolved');
    }

    function refuseSubmission() external {
        Bounty bountyContract = Bounty(bounty);
        bountyContract.setStatus('rejected');
    }
}
