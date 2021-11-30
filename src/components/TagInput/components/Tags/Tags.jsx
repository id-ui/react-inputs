import React from 'react';
import { RemoveIcon, Tag } from './styled';

function Tags({ value, className, onChange }) {
  const handleDeleteTag = (index) => () => {
    onChange(value.filter((item, itemIndex) => itemIndex !== index));
  };

  return (
    <div className={className}>
      {value.map((tag, index) => (
        <Tag key={tag}>
          {tag}
          <RemoveIcon onClick={handleDeleteTag(index)} />
        </Tag>
      ))}
    </div>
  );
}

export default Tags;
