import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// ... (comments and getServerSideProps logic remain the same) ...
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/fruits');
  const data = await res.json();
  return { props: { fruits: data.fruits } };
};

const SSRPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  fruits,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Fruit List</title>
        <meta name="description" content="A list of fruits rendered on the server." />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Server-Side Rendered Fruits</h1>
        <p className={styles.description}>
          This list was fetched on the server before the page was sent to you.
        </p>

        <ul>
          {fruits.map((fruit: string) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>

        {/* Apply the fix here */}
        <Link href="/">&larr; Back to Home</Link>
      </main>
    </div>
  );
};

export default SSRPage;