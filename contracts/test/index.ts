import { ethers, waffle } from 'hardhat';

describe('Bounty', () => {
  it('Should create a bounty', async function () {
    const Bounty = await ethers.getContractFactory('Bounty');
    const mainBounty = await Bounty.deploy(
      '0x25786B096CD3cCc982be85a3d970B0d054aD8F76',
      'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu'
    );
    const provider = waffle.provider;

    const BountyFactory = await ethers.getContractFactory('BountyFactory');
    const bountyFactory = await BountyFactory.deploy(mainBounty.address);

    const wallet1 = ethers.Wallet.createRandom().connect(provider);
    await bountyFactory.createBounty(
      wallet1.address,
      'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu',
      { value: 4000 }
    );
    const wallet2 = ethers.Wallet.createRandom().connect(provider);
    await bountyFactory.createBounty(
      wallet2.address,
      'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu',
      { value: 2000 }
    );
    await bountyFactory.createBounty(
      wallet2.address,
      'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu',
      { value: 8000 }
    );
    const bounty = await bountyFactory.getBountiesFromOrganization(
      wallet2.address
    );
    console.log(bounty);
    const children = await bountyFactory.getBounties();
    console.log(children);
  });
});
