import React, { useState } from 'react';
import { getStructuredTasksFromAI } from '../services/llmService';
import type { AITask } from '../types';

interface AddItemFormProps {
  onAddStructuredItems: (items: AITask[]) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddStructuredItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAiAdd = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      // calling our service to get the array of structured tasks
      const subtasks = await getStructuredTasksFromAI(inputValue);
      // Passed the entire array up to the parent component
      onAddStructuredItems(subtasks);
      setInputValue('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a complex goal (e.g., plan a vacation)"
        style={{ padding: '8px', minWidth: '300px' }}
      />
      <button onClick={handleAiAdd} disabled={isLoading} style={{ marginLeft: '10px' }}>
        {isLoading ? 'Planning...' : 'Generate Smart Plan ✨'}
      </button>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
    </div>
  );
};

export default AddItemForm;