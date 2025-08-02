import { useEffect } from 'react';
import { Counter } from './components/Counter';
import { Timer } from './components/Timer';
import InputFocus from './components/InputFocus';
import { ExpensiveCalc } from './components/ExpensiveCalc';
import { AddItemForm } from './components/AddItemForm';
import { Dropdown } from './components/generic/Dropdown';
import { useTheme } from './hooks/useTheme';
import type { UserRole } from './types';

const userRoles: UserRole[] = [
  { label: 'Viewer', value: 'viewer' },
  { label: 'Editor', value: 'editor' },
  { label: 'Admin', value: 'admin' },
];

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleRoleSelect = (role: UserRole) => {
    alert(`Selected Role: ${role.label}`);
  };

  return (
    <>
      <h1>React Synthesis: From Hooks to Context</h1>

      <div className="top-controls card">
        <Dropdown<string>
          options={['light', 'dark']}
          selectedValue={theme}
          onSelect={toggleTheme}
          displayValue={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
        />
        <Dropdown<UserRole>
          options={userRoles}
          selectedValue={userRoles[0]}
          onSelect={handleRoleSelect}
          displayValue={(option) => option.label}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card">
          <Counter />
        </div>
        <div className="card">
          <Timer />
        </div>
        <div className="card">
          <InputFocus />
        </div>
        <div className="card">
          <ExpensiveCalc />
        </div>
        <div className="card">
          <AddItemForm />
        </div>
      </div>
    </>
  );
}

export default App;
