import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Button from './Button';
import { BOUNTY_FACTORY_ADDRESS } from '../utils/contants';
import bountyFactoryAbi from '../abi/BountyFactory.json';
import { useSessionContext } from '../contexts/SessionContext';
import BountyList from './BountyList';

const StyledOrganizationDashboard = styled.div``;

const createBounty = async (provider: any, account: string) => {
  const signer = provider.getSigner();
  const bountyFactory = new ethers.Contract(
    BOUNTY_FACTORY_ADDRESS,
    JSON.stringify(bountyFactoryAbi.abi),
    signer
  );
  console.log(bountyFactory);

  const result = await bountyFactory.createChild(account, 1000);
  console.log(result);
};

const OrganizationDashboard = () => {
  const { provider, account } = useSessionContext();

  const [bounties, setBounties] = React.useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const bountyFactory = new ethers.Contract(
        BOUNTY_FACTORY_ADDRESS,
        JSON.stringify(bountyFactoryAbi.abi),
        provider
      );
      const bounties = await bountyFactory.getBounties(account);
      setBounties(bounties);
    })();
  }, []);

  return (
    <StyledOrganizationDashboard>
      <BountyList bounties={bounties} />
      <Button
        onClick={() => createBounty(provider, account)}
        text="Create a Bounty"
        color="#dcbaff"
      />
    </StyledOrganizationDashboard>
  );
};

export default OrganizationDashboard;
