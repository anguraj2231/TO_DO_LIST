import React from 'react'

export const SearchItem = ({Search, SetSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text" 
        placeholder='Search Item'
        value={Search}
        onChange={(e) => SetSearch(e.target.value)}
        />
    </form>
  )
}
