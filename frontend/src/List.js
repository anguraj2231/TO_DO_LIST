import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

export const List = ({ item, handleDelete, handlechange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.item);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handlechange(item.id, editValue);
    setIsEditing(false); 
  };

  return (
    <li className='item' key={item.id}>
      <input
        type="checkbox"
        onChange={() => handlechange(item.id)}
        checked={item.isChecked}
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)} 
            onBlur={() => { 
              handlechange(item.id, editValue);
              setIsEditing(false);
            }}
          />
        </form>
      ) : (
        <label
          style={item.isChecked ? { textDecoration: 'line-through' } : null}
          onDoubleClick={() => {
            setIsEditing(true);
            setEditValue(item.item);
          }}
        >
          {item.item}
        </label>
      )}
      <FaTrashAlt
        role="button"
        onClick={() => handleDelete(item.id)} 
        tabIndex="0"
      />
    </li>
  );
};
