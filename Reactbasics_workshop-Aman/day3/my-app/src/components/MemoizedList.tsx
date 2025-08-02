import React from 'react';

interface ListProps {
  items: string[];
}

const List = ({ items }: ListProps) => {
  console.log('Rendering List...');
  return (
    <ul className="item-list">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
};

export const MemoizedList = React.memo(List);