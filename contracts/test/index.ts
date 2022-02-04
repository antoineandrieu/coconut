import { expect } from 'chai';
const { ethers, waffle } = require('hardhat');
import { BigNumber } from '@ethersproject/bignumber';

describe('Bounty', function () {
  it('Should create a bounty', async function () {
    const Bounty = await ethers.getContractFactory('Bounty');
    const bounty = await Bounty.deploy(
      '0x25786B096CD3cCc982be85a3d970B0d054aD8F76',
      1000,
      { value: 666 }
    );
    const provider = waffle.provider;
    const balance = await provider.getBalance(bounty.address);
    expect(balance).to.equal(BigNumber.from(666));
  });
});
