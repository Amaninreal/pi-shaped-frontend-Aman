import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  // Determine CSS class based on count value
  const counterClass =
    count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero';

  return (
    <div className="card">
      <h2>Counter</h2>
      <span className={`counter-value ${counterClass}`}>{count}</span>
      <div>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
};
