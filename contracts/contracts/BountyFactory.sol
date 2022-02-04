//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/Clones.sol';
import 'hardhat/console.sol';
import './Bounty.sol';

contract BountyFactory {
    address masterContract;
    mapping(address => Bounty[]) Bounties;
    Bounty[] public children;

    constructor(address _masterContract) {
        masterContract = _masterContract;
    }

    function createChild(address _client_address, uint256 _award) external {
        Bounty child = Bounty(Clones.clone(masterContract));
        child.init(_client_address, _award);
        Bounties[_client_address].push(child);
        children.push(child);
    }

    function getBounties(address client_address)
        public
        view
        returns (Bounty[] memory)
    {
        console.log('get bounties');
        return Bounties[client_address];
    }

    function getChildren() public view returns (Bounty[] memory) {
        return children;
    }
}
