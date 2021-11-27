import React from "react";



const PrimaryTags = (props) => {
  return (
    <div className='MachineListDeptTags'>
      <span key='All' className='MachineListDeptTagWrapper'>
        <input onChange={props.filter} type='radio' name='options' className='btn-check' id='All' autoComplete='off' />
        <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor='All' >All</label>
      </span>
      {
        props.uniqueTags.map((item, i) => {
          return (
            <span key={item} className='MachineListDeptTagWrapper'>
              <input value={item} onChange={props.filter} type='radio' name='options' className='btn-check' id={i+1} autoComplete='off'/>
              <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor={i+1}>{item}</label>
            </span>
          )
        })
      }
    </div>
  )
}

export default PrimaryTags