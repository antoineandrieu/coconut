import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { BigNumber } from '@ethersproject/bignumber';

describe('Bounty', () => {
  it('Should create a bounty', async function () {
    const Bounty = await ethers.getContractFactory('Bounty');
    const mainBounty = await Bounty.deploy(
      '0x25786B096CD3cCc982be85a3d970B0d054aD8F76',
      1000,
      { value: 666 }
    );
    const provider = waffle.provider;
    const balance = await provider.getBalance(mainBounty.address);
    expect(balance).to.equal(BigNumber.from(666));

    const BountyFactory = await ethers.getContractFactory('BountyFactory');
    const bountyFactory = await BountyFactory.deploy(mainBounty.address);

    const wallet1 = ethers.Wallet.createRandom().connect(provider);
    await bountyFactory.createChild(wallet1.address, 4000);
    const wallet2 = ethers.Wallet.createRandom().connect(provider);
    await bountyFactory.createChild(wallet2.address, 2000);
    await bountyFactory.createChild(wallet2.address, 8000);
    const bounty = await bountyFactory.getBounties(wallet2.address);
    console.log(bounty);
    const children = await bountyFactory.getChildren();
    console.log(children);
  });
});
