import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// A beautiful loading skeleton component
const FruitSkeleton = () => (
  <>
    <div className={styles.skeleton} />
    <div className={styles.skeleton} />
    <div className={styles.skeleton} />
  </>
);

const CSRPage: NextPage = () => {
  const [fruits, setFruits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API endpoint on the client side
    fetch('/api/fruits')
      .then((res) => res.json())
      .then((data) => {
        setFruits(data.fruits);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={styles.container}>
      <Head>
        <title>CSR Fruit List</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Client-Side Rendered Fruits</h1>
        <p className={styles.description}>
          This list is fetched in your browser. You&apos;ll see a shimmering
          loading state first.
        </p>

        <ul className={styles.fruitList}>
          {isLoading ? (
            <FruitSkeleton />
          ) : (
            fruits.map((fruit) => (
              <li key={fruit} className={styles.fruitItem}>
                {fruit}
              </li>
            ))
          )}
        </ul>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
};

export default CSRPage;