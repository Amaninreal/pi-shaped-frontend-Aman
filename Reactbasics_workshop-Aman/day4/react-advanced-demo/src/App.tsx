import React, { useState, Suspense } from 'react';
import './App.css';
import Counter from './components/Counter';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import Card from './components/Card';

const LazySettings = React.lazy(() => import('./components/LazySettings'));

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced React Demo</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Toggle Theme (Currently {theme})
        </button>
        <p>
          Toggling the theme re-renders the App, but check the console: the
          Counter component does not re-render thanks to
          <code> React.memo </code>.
        </p>
      </header>

      <main>
        <Counter />

        <Card>
          <h2>Lazy Loading with Suspense</h2>
          <button onClick={() => setShowSettings(true)}>Show Settings</button>
          <Suspense
            fallback={<div className="loading">Loading Settings...</div>}
          >
            {showSettings && (
              <div className="settings">
                <LazySettings />
              </div>
            )}
          </Suspense>
        </Card>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;