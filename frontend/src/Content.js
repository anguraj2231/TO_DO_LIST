import React from 'react';
import ItemsList from './ItemsList';

const Content = ({items,handleDelete,handlechange}) => {
  return(
      <>
        {(items.length)? (
          <ItemsList
            items = {items}
            handleDelete = {handleDelete}
            handlechange = {handlechange}
          />
        ) : ( <p>LIST IS EMPTY</p>)}
      </>
  );

}

export default Content;
