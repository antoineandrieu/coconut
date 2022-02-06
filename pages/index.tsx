import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Login from '../components/Login';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>coconut </title>
        <meta name="description" content="Decentralized bounty platfotm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>coconut 🥥</h1>

        <p className={styles.description}>Decentralized bounty platform</p>
        <Login />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/codingantoine/coconut"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/github.svg"
              alt="Github Logo"
              width={288}
              height={44}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
