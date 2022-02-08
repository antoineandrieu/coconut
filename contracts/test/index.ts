import { ethers, waffle } from 'hardhat';

describe('Bounty', () => {
  it('Should create a bounty', async function () {
    const Bounty = await ethers.getContractFactory('Bounty');
    const mainBounty = await Bounty.deploy();
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

    const BountySubmission = await ethers.getContractFactory(
      'BountySubmission'
    );
    console.log(children);
    const bountySubmission = await BountySubmission.deploy(children[0]);
    bountySubmission.validateSubmission();
  });
});
