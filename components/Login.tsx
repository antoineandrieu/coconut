import React from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Button from './Button';
import { useSessionContext } from '../contexts/SessionContext';

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 50px 50px;
  min-width: 80%;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    min-width: 40%;
  }
`;

const Login: React.FC = () => {
  const { setUserType, setAccount } = useSessionContext();

  const login = async (userType: 'hunter' | 'organization') => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    );
    // Prompt user for account connections
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    console.log('Account:', await signer.getAddress());
    setUserType(userType);
    setAccount(await signer.getAddress());
  };

  return (
    <StyledLogin>
      <Button
        onClick={() => login('hunter')}
        text="Login as Hunter"
        color="#dcbaff"
      >
        Bounty
      </Button>
      <Button
        onClick={() => login('organization')}
        text="Login as Organization"
        color="#66f2d5"
      >
        Bounty
      </Button>
    </StyledLogin>
  );
};

export default Login;
