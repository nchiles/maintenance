import React from 'react';

const SecondaryTags = (props) => {
  return (
    <div className='MachineListCatTags'>
      {
        props.uniqueTags.map((cat) => {
          return (
            <span key={cat} className='MachineListCatTagWrapper'>
              <input onChange={props.filter} type='radio' name='options' className='btn-check' id={cat} autoComplete='off'/>
              <label className='MachineListCatTag btn btn-outline-secondary' htmlFor={cat}>{cat}</label>
            </span>
          )
        })
      }
    </div>
  )
}

export default SecondaryTags;