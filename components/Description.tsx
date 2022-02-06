import React from 'react';
import styled from 'styled-components';

const StyledDescription = styled.p`
  line-height: 1;
  font-size: 2rem;
`;

const Description: React.FC = () => {
  return <StyledDescription>Decentralized bounty platform</StyledDescription>;
};

export default Description;
