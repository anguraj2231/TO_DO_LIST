import React from 'react';
import { List } from './List';

const ItemsList = ({items,handleDelete,handlechange}) => {
  return (
    <ul>
          {
            items.map((item) => 
            (
                <List 

                item = {item}
                key = {item.id}
                handleDelete = {handleDelete}
                handlechange = {handlechange}

                />
              )
            )
          }
        </ul>
  )
}

export default ItemsList;

