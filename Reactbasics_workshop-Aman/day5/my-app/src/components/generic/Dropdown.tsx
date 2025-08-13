import React from 'react';

interface DropdownProps<T> {
  options: T[];
  onSelect: (selected: T) => void;
  displayValue: (option: T) => string;
  selectedValue: T;
}

export function Dropdown<T>({ options, onSelect, displayValue, selectedValue }: DropdownProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options[event.target.selectedIndex];
    onSelect(selected);
  };

  return (
    <select onChange={handleChange} value={displayValue(selectedValue)}>
      {options.map((option, index) => (
        <option key={index} value={displayValue(option)}>
          {displayValue(option)}
        </option>
      ))}
    </select>
  );
}