import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  line-height: 1.15;
  font-size: 2rem;
  font-family: 'Baloo Paaji 2', cursive;
`;

const Title: React.FC = () => {
  return <StyledTitle>coconut 🥥</StyledTitle>;
};

export default Title;
