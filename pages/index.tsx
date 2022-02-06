import type { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import Index from '../components/Index';

const Container = styled.div`
  padding: 0 2rem;
  height: 90vh;
`;

const Footer = styled.footer`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>coconut 🥥</title>
        <meta name="description" content="Decentralized bounty platfotm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Index />

      <Footer>
        <a
          href="https://github.com/codingantoine/coconut"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <Image
              src="/github.svg"
              alt="Github Logo"
              width={288}
              height={44}
            />
          </span>
        </a>
      </Footer>
    </Container>
  );
};

export default Home;
