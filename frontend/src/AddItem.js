import React from 'react';
import { useRef } from 'react';
import {FaPlus} from 'react-icons/fa'

export const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const Focus = useRef();
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input autoFocus ref={Focus} id='addItem' type="text" placeholder='Add Itemss' required value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        />
        <button type='submit' aria-label='AddItem' onClick={() => Focus.current.focus()}><FaPlus/></button>
    </form>
  )
}
