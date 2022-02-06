import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import AnonymousIndex from '../components/AnonymousIndex';
import Dashboard from '../components/Dashboard';
import { useSessionContext } from '../contexts/SessionContext';

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
  const { setProvider, account, setAccount, userType } = useSessionContext();

  useEffect(() => {
    (async function () {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        'any'
      );
      setProvider(provider);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setAccount(await signer.getAddress());
    })();
  }, []);

  return userType ? (
    <Dashboard account={account} userType={userType} />
  ) : (
    <StyledIndex>
      <AnonymousIndex />
    </StyledIndex>
  );
};

export default Index;
