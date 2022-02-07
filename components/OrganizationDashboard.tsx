import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import BountyForm from './BountyForm';
import { BOUNTY_FACTORY_ADDRESS } from '../utils/contants';
import bountyFactoryAbi from '../abi/BountyFactory.json';
import { useSessionContext } from '../contexts/SessionContext';
import BountyList from './BountyList';
import { create } from 'ipfs-http-client';

const StyledOrganizationDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const OrganizationDashboard = () => {
  const { provider, account } = useSessionContext();

  const [bounties, setBounties] = useState<any[]>([]);

  const ipfsClient = create({ url: process.env.NEXT_PUBLIC_IPFS_ENDPOINT });

  useEffect(() => {
    (async function () {
      const bountyFactory = new ethers.Contract(
        BOUNTY_FACTORY_ADDRESS,
        JSON.stringify(bountyFactoryAbi.abi),
        provider
      );
      const bounties = await bountyFactory.getBounties(account);
      console.log(bounties);
      setBounties(bounties);
    })();
  }, []);

  const createBounty = async (
    provider: any,
    account: string,
    award: number
  ) => {
    try {
      const { path } = await ipfsClient.add(JSON.stringify({ award }));
      console.log(path);
    } catch (error) {
      console.error('IPFS error', error);
    }

    const signer = provider.getSigner();
    const bountyFactory = new ethers.Contract(
      BOUNTY_FACTORY_ADDRESS,
      JSON.stringify(bountyFactoryAbi.abi),
      signer
    );

    const bounty = await bountyFactory.createChild(account, award);
    console.log('Created bounty', bounty);
  };

  return (
    <StyledOrganizationDashboard>
      <BountyList bounties={bounties} ipfsClient={ipfsClient} />
      <BountyForm
        handleSubmit={(award) => createBounty(provider, account, award)}
      />
    </StyledOrganizationDashboard>
  );
};

export default OrganizationDashboard;
