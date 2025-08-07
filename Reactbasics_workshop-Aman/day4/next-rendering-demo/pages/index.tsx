import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Rendering Demo</title>
        <meta name="description" content="Demo of CSR vs SSR in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Rendering Demo!</h1>

        <p className={styles.description}>
          Choose a rendering method to see it in action.
        </p>

        <div className={styles.grid}>
          {/*
            CORRECT SYNTAX:
            The className and styles are applied directly to the <Link> component.
            There is NO <a> tag inside.
          */}
          <Link href="/csr" className={styles.card}>
            <h2>Client-Side Rendering &rarr;</h2>
            <p>Data is fetched in the browser. You will see a loading state.</p>
          </Link>

          <Link href="/ssr" className={styles.card}>
            <h2>Server-Side Rendering &rarr;</h2>
            <p>Data is fetched on the server. The page arrives complete.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;