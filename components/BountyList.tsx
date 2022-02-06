import React from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../contexts/SessionContext';

const StyledBountyList = styled.div``;

interface BountyListProps {
  bounties: any;
}
const BountyList = ({ bounties }: BountyListProps) => {
  const { provider, account } = useSessionContext();

  return <StyledBountyList>{bounties}</StyledBountyList>;
};

export default BountyList;
