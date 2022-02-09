import { ethers, waffle } from 'hardhat';
import { expect } from 'chai';

describe('Bounty', () => {
  let bountyFactory: any;
  let provider: any;

  before(async () => {
    const Bounty = await ethers.getContractFactory('Bounty');
    const mainBounty = await Bounty.deploy();
    provider = waffle.provider;
    const BountyFactory = await ethers.getContractFactory('BountyFactory');
    bountyFactory = await BountyFactory.deploy(mainBounty.address);
  });

  it('Should create a bounty', async () => {
    const orgaWallet1 = ethers.Wallet.createRandom().connect(provider);
    const cid = 'Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu';
    await bountyFactory.createBounty(orgaWallet1.address, cid, {
      value: ethers.utils.parseEther('0.01'),
    });
    const bounty1 = await bountyFactory.getBountiesFromOrganization(
      orgaWallet1.address
    );
    const balance = await provider.getBalance(bounty1[0].bounty_address);

    expect(bounty1).to.have.lengthOf(1);
    expect(bounty1[0].ipfs_cid).to.equal(cid);
    expect(ethers.utils.formatEther(balance)).to.equal('0.01');
  });

  it('Should create multiple bounties', async () => {
    const orgaWallet2 = ethers.Wallet.createRandom().connect(provider);
    await bountyFactory.createBounty(
      orgaWallet2.address,
      'Qmcg2geJ2eCSMEBBSbP8Z56AZgg6mnfTHo56t4SBC74873',
      { value: ethers.utils.parseEther('0.02') }
    );
    await bountyFactory.createBounty(
      orgaWallet2.address,
      'QmUwHMFY9GSiKgjqyZpgAv2LhBrh7GV8rtLuagbry9wmMU',
      { value: ethers.utils.parseEther('0.03') }
    );
    const bounties = await bountyFactory.getBounties();
    const bountiesWallet2 = await bountyFactory.getBountiesFromOrganization(
      orgaWallet2.address
    );
    expect(bounties).to.have.lengthOf(3);
    expect(bountiesWallet2).to.have.lengthOf(2);
  });

  it('Should create a bounty submission', async () => {
    const orgaWallet = ethers.Wallet.createRandom().connect(provider);
    // const balance = ethers.utils.hexlify(100000000000000000);
    await provider.send('hardhat_setBalance', [
      orgaWallet.address,
      '0x16345785D8A0000',
    ]);
    await bountyFactory.createBounty(
      orgaWallet.address,
      'Qmcg2geJ2eCSMEBBSbP8Z56AZgg6mnfTHo56t4SBC74873',
      { value: ethers.utils.parseEther('0.02') }
    );
    const bounties = await bountyFactory.getBountiesFromOrganization(
      orgaWallet.address
    );
    const hunterWallet = ethers.Wallet.createRandom().connect(provider);
    const BountySubmission = await ethers.getContractFactory(
      'BountySubmission'
    );
    const bountySubmission = await BountySubmission.deploy(
      bounties[0].bounty_address
    );
    // const bountySubmissionWithSigner = bountySubmission.connect(orgaWallet);
    await bountySubmission.validateSubmission();
    const signer = provider.getSigner(0);
    const bounty = await ethers.getContractAt(
      'Bounty',
      bounties[0].bounty_address,
      signer
    );
    const status = await bounty.getStatus();
    expect(status).to.equal('resolved');
    // const balance = await provider.getBalance(hunterWallet.address);
    // console.log(balance);
  });
});
