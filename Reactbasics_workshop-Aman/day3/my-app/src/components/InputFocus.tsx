import React, { useRef } from 'react';

const InputFocus: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h3>Input Focus</h3>
      <input ref={ref} type="text" placeholder="Focus me!" />
      <button onClick={() => ref.current?.focus()}>Focus Input</button>
    </div>
  );
};

export default InputFocus;
