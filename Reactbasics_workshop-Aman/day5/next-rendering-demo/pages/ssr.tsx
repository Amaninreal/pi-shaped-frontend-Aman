import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/fruits');
  const data = await res.json();
  return {
    props: {
      fruits: data.fruits,
    },
  };
};

const SSRPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  fruits,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Fruit List</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Server-Side Rendered Fruits</h1>
        <p className={styles.description}>
          This list was fetched on the server. The page arrived here fully
          formed.
        </p>

        <ul className={styles.fruitList}>
          {fruits.map((fruit: string) => (
            <li key={fruit} className={styles.fruitItem}>
              {fruit}
            </li>
          ))}
        </ul>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
};

export default SSRPage;