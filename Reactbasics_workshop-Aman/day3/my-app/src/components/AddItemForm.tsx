import { useState, useCallback } from 'react';
import { MemoizedList } from './MemoizedList';

export const AddItemForm = () => {
  const [items, setItems] = useState<string[]>(['item 1', 'item 2']);
  const [newItem, setNewItem] = useState('');

  // useCallback memoizes this function, so it doesn't get recreated on every render.
  const addItem = useCallback(() => {
    if (newItem.trim()) {
      setItems(prevItems => [...prevItems, newItem.trim()]);
      setNewItem('');
    }
  }, [newItem]);
  return (
    <div className="card">
      <h2>List</h2>
      <p>The list component below will not re-render while you type in the input field.</p>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <MemoizedList items={items} />
    </div>
  );
};