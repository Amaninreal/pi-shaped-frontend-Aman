import { useState, useEffect } from 'react';

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="card">
      <h2>Timer (useEffect)</h2>
      <p>{seconds}s</p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};


import { useRef } from 'react';

export const InputFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="card">
      <h2>Input Focus (useRef)</h2>
      <input ref={inputRef} type="text" placeholder="Click button to focus me" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};