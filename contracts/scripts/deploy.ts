import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Bounty = await ethers.getContractFactory('Bounty');
  const bounty = await Bounty.deploy(
    '0x25786B096CD3cCc982be85a3d970B0d054aD8F76',
    ''
  );
  await bounty.deployed();
  console.log('Bounty deployed to:', bounty.address);

  const BountyFactory = await ethers.getContractFactory('BountyFactory');
  const bountyFactory = await BountyFactory.deploy(bounty.address);
  await bountyFactory.deployed();
  console.log('BountyFactory deployed to:', bountyFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
