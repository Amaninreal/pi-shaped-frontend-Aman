import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// ... (comments and component logic remain the same) ...
const CSRPage: NextPage = () => {
  const [fruits, setFruits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fruits')
      .then((res) => res.json())
      .then((data) => {
        setFruits(data.fruits);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CSR Fruit List</title>
        <meta name="description" content="A list of fruits rendered on the client." />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Client-Side Rendered Fruits</h1>
        <p className={styles.description}>
          This list is fetched in the browser after the page loads.
        </p>

        {isLoading ? (
          <p>Loading fruits...</p>
        ) : (
          <ul>
            {fruits.map((fruit) => (
              <li key={fruit}>{fruit}</li>
            ))}
          </ul>
        )}

        {/* Apply the fix here */}
        <Link href="/">&larr; Back to Home</Link>
      </main>
    </div>
  );
};

export default CSRPage;