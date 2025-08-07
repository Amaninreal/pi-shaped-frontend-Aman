import React, { useState, useMemo } from 'react';
import Card from './Card';

const expensiveFibonacci = (n: number): number =>
  n <= 1 ? 1 : expensiveFibonacci(n - 1) + expensiveFibonacci(n - 2);

const Counter = () => {
  const [count, setCount] = useState(0);

  const fibonacciValue = useMemo(() => {
    console.log(`Calculating Fibonacci for ${count}...`);
    return expensiveFibonacci(count);
  }, [count]);

  console.log('Counter component re-rendered.');

  return (
    <Card>
      <h2>Memoized Counter</h2>
      <p>
        This Fibonacci calculation is slow, but <code>useMemo</code> ensures it
        only runs when the count changes.
      </p>
      <h3>
        Count: {count} / Fibonacci: {fibonacciValue}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </Card>
  );
};

export default React.memo(Counter);
