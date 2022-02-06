import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import Title from './Title';
import Description from './Description';

const StyledAnonymousIndex = styled.div`
  min-height: 90vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
`;

const AnonymousIndex: React.FC = () => {
  return (
    <StyledAnonymousIndex>
      <Title />
      <Description />
      <Login />
    </StyledAnonymousIndex>
  );
};

export default AnonymousIndex;
