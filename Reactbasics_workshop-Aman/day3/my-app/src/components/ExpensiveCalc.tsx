import { useState, useMemo } from 'react';

const slowFactorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let i = 0;
  while (i < 1000000000) i++;
  return n * slowFactorial(n - 1);
};


export const ExpensiveCalc = () => {
  const [num, setNum] = useState(7);
  const [unrelatedState, setUnrelatedState] = useState('');

  const factorial = useMemo(() => slowFactorial(num), [num]);

  return (
    <div className="card">
      <h2>Expensive Calculation (useMemo)</h2>
      <p>Factorial of {num} is {factorial}</p>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <hr style={{margin: '1rem 0'}}/>
      <p>This input update does NOT trigger the calculation:</p>
      <input
        type="text"
        placeholder="Unrelated state change"
        value={unrelatedState}
        onChange={(e) => setUnrelatedState(e.target.value)}
      />
    </div>
  );
};