import React from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../contexts/SessionContext';
import AnonymousIndex from '../components/AnonymousIndex';
import Dashboard from '../components/Dashboard';

const StyledIndex = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
`;

const Index: React.FC = () => {
  const { account, userType } = useSessionContext();

  return account ? (
    <Dashboard account={account} userType={userType} />
  ) : (
    <StyledIndex>
      <AnonymousIndex />
    </StyledIndex>
  );
};

export default Index;
