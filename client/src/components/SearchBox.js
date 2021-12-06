import React from 'react';

const SearchBox = (props) => {
  return (
    <div className='MachineListSearchContainer'>
      <input className='form-control MachineListSearch' onChange={props.filter} placeholder='search...'></input>  
    </div>
  )
}

export default SearchBox;