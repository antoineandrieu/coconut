import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledBountyList = styled.div``;

interface BountyListProps {
  bounties: any;
}
const BountyList = ({ bounties }: BountyListProps) => {
  const [bountiesData, setBountiesData] = React.useState<any[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const bountiesFromIfps = await Promise.all(
          bounties.map(async (cid: any) => {
            const res = await fetch(`/api/ipfs/${cid}`);
            const bounty = await res.json();
            console.log(bounty);
            return bounty;
          })
        );
        console.log(bountiesFromIfps);
        setBountiesData(bountiesFromIfps);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <StyledBountyList>
      <h1>Bounty List</h1>
      <ul>
        {bountiesData.map((bounty, index) => (
          <li key={index}>
            <h2>{bounty.title}</h2>
            <p>{bounty.description}</p>
            <p>{bounty.award}</p>
          </li>
        ))}
      </ul>
    </StyledBountyList>
  );
};

export default BountyList;
