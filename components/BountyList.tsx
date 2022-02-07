import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledBountyList = styled.div``;

interface BountyListProps {
  bounties: any;
  ipfsClient: any;
}
const BountyList = ({ bounties, ipfsClient }: BountyListProps) => {
  const [bountiesData, setBountiesData] = React.useState<any[]>([]);

  useEffect(() => {
    let cleanedBounties: any[] = [];
    bounties.map((bounty: any) => {
      const data = ipfsClient.get(bounty);
      cleanedBounties.push(data);
    });
    console.log(cleanedBounties);
    setBountiesData(cleanedBounties);
  }, []);

  return (
    <StyledBountyList>
      {bountiesData.map((bounty: any) => (
        <div key={bounty}>{bounty}</div>
      ))}
    </StyledBountyList>
  );
};

export default BountyList;
