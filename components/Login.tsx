import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 50px 50px;
  min-width: 80%;

  @media screen and (max-width: 600px) {
    background-color: olive;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    min-width: 40%;
  }
`;

const Login: React.FC = () => {
  return (
    <StyledLogin>
      <Button
        onClick={() => console.log('click')}
        text="Login as Hunter"
        color="#dcbaff"
      >
        Bounty
      </Button>
      <Button
        onClick={() => console.log('click')}
        text="Login as Organization"
        color="#66f2d5"
      >
        Bounty
      </Button>
    </StyledLogin>
  );
};

export default Login;
