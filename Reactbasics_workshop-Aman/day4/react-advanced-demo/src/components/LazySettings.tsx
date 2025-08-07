import React from 'react';

const LazySettings = () => (
  <>
    <h2>Settings Panel (Lazy Loaded)</h2>
    <p>This component was not part of the initial bundle.</p>
    <p>It was loaded only when you clicked the button!</p>
  </>
);

export default LazySettings;
