import React from 'react';
import styled from 'styled-components';
import SmallTitle from './SmallTitle';
import HunterDashboard from './HunterDashboard';
import OrganizationDashboard from './HunterDashboard';

const StyledDashboard = styled.div`
  height: 90vh;
  font-family: 'Roboto Mono', monospace;
`;
const StyledHeader = styled.header`
  max-height: 5vh;
  display: flex;
  justify-content: space-between;
`;

interface DashboardProps {
  account: string;
  userType: string;
}
const shortenAddress = (address: string) => {
  return (
    address.substring(0, 6) + '...' + address.substring(address.length - 4)
  );
};

const Dashboard = ({ account, userType }: DashboardProps) => {
  return (
    <StyledDashboard>
      <StyledHeader>
        <SmallTitle />
        <div>{shortenAddress(account)}</div>
      </StyledHeader>
      {userType == 'hunter' ? <HunterDashboard /> : <OrganizationDashboard />}
    </StyledDashboard>
  );
};

export default Dashboard;
