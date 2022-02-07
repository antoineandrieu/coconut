//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/Clones.sol';
import 'hardhat/console.sol';
import './Bounty.sol';

contract BountyFactory {
    address mainContract;
    mapping(address => Bounty[]) OrganizationBounties;
    Bounty[] public bounties;

    constructor(address _mainContract) {
        mainContract = _mainContract;
    }

    function createBounty(
        address _organization_address,
        string memory _ipfs_cid
    ) external payable {
        Bounty child = Bounty(Clones.clone(mainContract));
        child.init{value: msg.value}(_organization_address, _ipfs_cid);
        OrganizationBounties[_organization_address].push(child);
        bounties.push(child);
    }

    function getBountiesFromOrganization(address organization_address)
        public
        view
        returns (Bounty[] memory)
    {
        return OrganizationBounties[organization_address];
    }

    function getBounties() public view returns (Bounty[] memory) {
        return bounties;
    }
}
