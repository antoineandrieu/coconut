import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import BountyForm from './BountyForm';
import { BOUNTY_FACTORY_ADDRESS } from '../utils/constants';
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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const ipfsClient = create({ url: process.env.NEXT_PUBLIC_IPFS_ENDPOINT });

  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading);
    (async function () {
      const bountyFactory = new ethers.Contract(
        BOUNTY_FACTORY_ADDRESS,
        JSON.stringify(bountyFactoryAbi.abi),
        provider
      );
      const bounties = await bountyFactory.getBountiesFromOrganization(account);
      setBounties(bounties);
      console.log(bounties);
    })();
    setIsLoading(false);
  }, []);

  const createBounty = async (provider: any, account: string, data: object) => {
    try {
      const { path } = await ipfsClient.add(JSON.stringify(data));
      const signer = provider.getSigner();
      const bountyFactory = new ethers.Contract(
        BOUNTY_FACTORY_ADDRESS,
        JSON.stringify(bountyFactoryAbi.abi),
        signer
      );

      const bounty = await bountyFactory.createBounty(account, path, {
        // @ts-ignore
        value: data.award,
      });
      const bounties = await bountyFactory.getBountiesFromOrganization(account);
      setBounties(bounties);
      console.log('Created bounty', bounty);
    } catch (error) {
      console.error('Create Bounty error', error);
    }
  };

  return (
    <StyledOrganizationDashboard>
      {bounties.length ? (
        <BountyList bounties={bounties} />
      ) : (
        <div>no bounty</div>
      )}
      <BountyForm
        handleSubmit={(award) => createBounty(provider, account, award)}
      />
    </StyledOrganizationDashboard>
  );
};

export default OrganizationDashboard;
