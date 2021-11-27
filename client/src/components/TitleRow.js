import React from 'react';

const TitleRow = (props) => {
  return (
    <div className='TitleRow'>  
      <h1 className='MachineListTitle'>{props.title}</h1>

      <div className='MachineListSearchContainer'>
        <input className='form-control MachineListSearch' onChange={props.filter} placeholder='search...'></input>  
      </div>
    </div>
  )
}

export default TitleRow;