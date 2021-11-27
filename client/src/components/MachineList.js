import React, { useState, useEffect } from 'react';
import '../css/MachineList.css';
import MachineListItem from './MachineListItem';
import Loading from './Loading';
import PrimaryTags from './PrimaryTags';
import SecondaryTags from './SecondaryTags';
import TitleRow from './TitleRow';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect called!')
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/machines/');
      const data = await res.json();
      setMachines(data);          
      setFilteredMachines(data); 
      setIsLoading(true);        
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
      return machine.vector_name.toLowerCase().includes(query) || machine.manufacturer_name.toLowerCase().includes(query);
    }));
  }

  //tag filters
  const handleDeptTagFilter = e => {
    setFilteredMachines(e.target.value === 'All' ? machines : machines.filter(machine => machine.department === e.target.value));
  }

  const handleCatTagFilter = e => {
    setFilteredMachines(e.target.value === 'All' ? machines : machines.filter(machine => machine.category === e.target.value));
  }

  //get filter tags
  const uniqueDepartments = [...new Set(machines.map(machine => machine.department))].sort();
  const uniqueCategories = [...new Set(machines.map(machine => machine.category))].sort();

  //render table
  return (    
    !isLoading ? <Loading loading={'equipment'}/> :
    <div className='container'>                
      <TitleRow title={'Equipment'} filter={handleSearchFilter}/> 
      <PrimaryTags filter={handleDeptTagFilter} uniqueTags={uniqueDepartments} />
      <SecondaryTags filter={handleCatTagFilter} uniqueTags={uniqueCategories} />
     
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