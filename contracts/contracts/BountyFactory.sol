//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/Clones.sol';
import 'hardhat/console.sol';
import './Bounty.sol';

contract BountyFactory {
    address mainContract;
    mapping(address => OrganizationBounty[]) OrganizationBounties;
    Bounty[] public bounties;
    struct OrganizationBounty {
        address bounty_address;
        string ipfs_cid;
    }

    constructor(address _mainContract) {
        mainContract = _mainContract;
    }

    function createBounty(
        address _organization_address,
        string memory _ipfs_cid
    ) external payable {
        address clone_addr = Clones.clone(mainContract);
        Bounty child = Bounty(clone_addr);
        child.init{value: msg.value}(_organization_address, _ipfs_cid);
        OrganizationBounties[_organization_address].push(
            OrganizationBounty(clone_addr, _ipfs_cid)
        );
        bounties.push(child);
    }

    function getBountiesFromOrganization(address organization_address)
        external
        view
        returns (OrganizationBounty[] memory)
    {
        return OrganizationBounties[organization_address];
    }

    function getBounties() external view returns (Bounty[] memory) {
        return bounties;
    }
}
