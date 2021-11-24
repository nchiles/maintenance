import React, { useState, useEffect } from 'react';
import '../css/PrevMaintenanceList.css';
import PrevMaintenanceListItem from './PrevMaintenanceListItem';


const PrevMaintenanceList = () => {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  // const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('useEffect called!')
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/machines/preventative-maintenance/');
      const data = await res.json();
      console.log(data)
      setProcedures(data);          
      setFilteredProcedures(data);          
    };
    fetchData();
  }, [])

  // //search filter
  // const handleSearchFilter = (e) => {
  //   //clear checked filter tag
  //   var radioButton = document.getElementsByName('options');
  //   for(var i = 0; i < radioButton.length; i++) {
  //     radioButton[i].checked = false;
  //   }      

  //   let query = e.target.value.toLowerCase();
  //   setFilteredProcedures(procedures.filter( machine => {
  //     return machine.vector_name.toLowerCase().includes(query) || machine.manufacturer_name.toLowerCase().includes(query);
  //   }));
  // }

  // //tag filters
  // const handleDeptTagFilter = e => {
  //   setFilteredProcedures(e.target.id === 'All' ? procedures : procedures.filter(machine => machine.department === e.target.id));
  // }

  // const handleCatTagFilter = e => {
  //   setFilteredProcedures(e.target.id === 'All' ? procedures : procedures.filter(machine => machine.category === e.target.id));
  // }

  // //get filter tags
  // const uniqueDepartments = [...new Set(procedures.map(machine => machine.department))].sort();
  // const uniqueCategories = [...new Set(procedures.map(machine => machine.category))].sort();

  //render table
  return (
    <div className='container'>                
      <div className='TitleRow'>  
        <h1 className='MachineListTitle'>Preventative Maintenance</h1>

        {/* <div className='MachineListSearchContainer'>
          <input className='form-control MachineListSearch' onChange={handleSearchFilter} placeholder='search...'></input>  
        </div> */}
      </div>
       
      {/* <div className='MachineListDeptTags'>
        <span key='All' className='MachineListDeptTagWrapper'>
          <input onChange={handleDeptTagFilter} type='radio' name='options' className='btn-check' id='All' autoComplete='off' />
          <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor='All' >All</label>
        </span>
        {
          uniqueDepartments.map((dept) => {
            return (
              <span key={dept} className='MachineListDeptTagWrapper'>
                <input onChange={handleDeptTagFilter} type='radio' name='options' className='btn-check' id={dept} autoComplete='off'/>
                <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor={dept}>{dept}</label>
              </span>
            )
          })
        }
      </div>
      <div className='MachineListCatTags'>
        {
          uniqueCategories.map((cat) => {
            return (
              <span key={cat} className='MachineListCatTagWrapper'>
                <input onChange={handleCatTagFilter} type='radio' name='options' className='btn-check' id={cat} autoComplete='off'/>
                <label className='MachineListCatTag btn btn-outline-secondary' htmlFor={cat}>{cat}</label>
              </span>
            )
          })
        }
      </div> */}
     
      <table className='table table-hover align-middle'>
        <thead></thead>
        <tbody>
          {filteredProcedures.length > 0 ? filteredProcedures.map(procedure => (
            <PrevMaintenanceListItem 
              procedure={procedure} 
              key={procedure._id}/>
          )): <tr><td><h3>Nothing found, try again</h3></td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default PrevMaintenanceList;