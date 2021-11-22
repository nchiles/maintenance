import React, { useState, useEffect } from 'react';
import '../css/MachineList.css'
import MachineListItem from './MachineListItem';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  // const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('useEffect called!')
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/machines/');
      const data = await res.json();
      setMachines(data);          
      setFilteredMachines(data);          
    };
    fetchData();
  }, [])

  //search filter
  const handleSearchFilter = (e) => {
    //clear checked filter tag
    var radioButton = document.getElementsByName('options');
    for(var i = 0; i < radioButton.length; i++) {
      radioButton[i].checked = false;
    }      

    let query = e.target.value.toLowerCase();
    setFilteredMachines(machines.filter( machine => {
      return machine.vectorName.toLowerCase().includes(query) || machine.manufacturerName.toLowerCase().includes(query);
    }));
  }

  //tag filter
  const handleTagFilter = e => {
    setFilteredMachines(e.target.id === 'All' ? machines : machines.filter(machine => machine.department === e.target.id));
  }

  //get departments for tags
  const uniqueDepts = [...new Set(machines.map(machine => machine.department))];

  //render table
  return (
    <div className='container'>                
      <div className='TitleRow'>  
        <h1 className='MachineListTitle'>Equipment</h1>

        <div className='MachineListSearchContainer'>
          <input className='form-control MachineListSearch' onChange={handleSearchFilter} placeholder='search...'></input>  
        </div>
      </div>
       
      <div className='MachineListTags'>
        <span className='MachineListTagWrapper'>
          <input key='All' onChange={handleTagFilter} type='radio' name='options' className='btn-check' id='All' autoComplete='off' />
          <label key='All' className='MachineListTag btn btn-outline-secondary' htmlFor='All' >All</label>
        </span>
        {
          uniqueDepts.map((dept) => {
            return (
              <span className='MachineListTagWrapper'>
                <input key={dept} onChange={handleTagFilter} type='radio' name='options' className='btn-check' id={dept} autoComplete='off'/>
                <label key={dept} className='MachineListTag btn btn-outline-secondary' htmlFor={dept}>{dept}</label>
              </span>
            )
          })
        }
      </div>
     
      <table className='table table-hover align-middle'>
        <thead></thead>
        <tbody>
          {filteredMachines.length > 0 ? filteredMachines.map(machine => (
            <MachineListItem machine={machine} key={machine._id}/>
          )): <tr><td><h3>Nothing found, try again</h3></td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default MachineList;