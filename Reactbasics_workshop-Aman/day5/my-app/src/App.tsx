import React, { useState, useEffect } from 'react';
import type { AITask, Priority } from './types'; 
import { Counter } from './components/Counter';
import { Timer } from './components/Timer';
import InputFocus from './components/InputFocus';
import { ExpensiveCalc } from './components/ExpensiveCalc';
import AddItemForm from './components/AddItemForm';
import { Dropdown } from './components/generic/Dropdown';
import { useTheme } from './hooks/useTheme';
import './App.css';

interface UserRole {
  label: string;
  value: string;
}

const userRoles: UserRole[] = [
  { label: 'Viewer', value: 'viewer' },
  { label: 'Editor', value: 'editor' },
  { label: 'Admin', value: 'admin' },
];

const TaskItem: React.FC<AITask & { id: number }> = ({ text, category, priority }) => {
  const priorityColors: Record<Priority, string> = {
    High: '#ffcdd2',
    Medium: '#fff9c4',
    Low: '#c8e6c9',
  };

  return (
    <li style={{
      backgroundColor: priorityColors[priority],
      listStyle: 'none',
      padding: '10px',
      margin: '8px 0',
      borderRadius: '5px',
      borderLeft: `5px solid ${priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green'}`,
      textAlign: 'left', 
      color: '#333' 
    }}>
      <strong style={{ display: 'block', marginBottom: '4px' }}>{text}</strong>
      <small><em>Category: {category} | Priority: {priority}</em></small>
    </li>
  );
};


function App() {
  const { theme, toggleTheme } = useTheme();

  const [tasks, setTasks] = useState<Array<AITask & { id: number }>>([]);

  const handleAddStructuredItems = (newItems: AITask[]) => {
    const itemsWithIds = newItems.map(item => ({
      ...item,
      id: Date.now() + Math.random(),
    }));
    setTasks(prevTasks => [...prevTasks, ...itemsWithIds]);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleRoleSelect = (role: UserRole) => {
    alert(`Selected Role: ${role.label}`);
  };

  return (
    <div className="App">
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
        
        {/* my integrated AI Task Planner section --- */}
        <div className="card">
          <h2>Advanced AI Task Planner</h2>
          <p>Enter a complex goal, and let AI break it down for you.</p>
          
          {/* Passing the required prop to AddItemForm */}
          <AddItemForm onAddStructuredItems={handleAddStructuredItems} />
          
          {/* Added the list to display the generated tasks */}
          <ul style={{ padding: 0, width: '90%', maxWidth: '600px', margin: '20px auto 0' }}>
            {tasks.map(task => (
              <TaskItem key={task.id} {...task} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;