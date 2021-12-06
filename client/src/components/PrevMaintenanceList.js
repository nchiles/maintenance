import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PrevMaintenanceList.css';
import PrevMaintenanceListItem from './PrevMaintenanceListItem';
import PrimaryTags from './PrimaryTags';
import TitleRow from './TitleRow';
import SearchBox from './SearchBox';
import Loading from './Loading';


const PrevMaintenanceList = () => {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);  
  const [isMachinePage, setIsMachinePage] = useState('All');
  // const [selectedTag, setSelectedTag] = useState('All');
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // filtered state should have frequency, render page, search result

  useEffect(() => {
    console.log('useEffect called!')
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/machines/preventative-maintenance/');
      const data = await res.json();
      setProcedures(data);
      setFilteredProcedures(data);
      // setFilteredMachineProcedures(slug === undefined ? data : data.filter(procedure => procedure.machine[0]._id === slug));
      setIsMachinePage(slug === undefined ? false : true);
      setIsLoading(true);
    };
    fetchData();
  }, [])

  // set procedures based on URL
  const pageProcedures = !isMachinePage ? filteredProcedures : procedures.filter((procedure) => procedure.machine[0]._id === slug);

  // //search filter
  const handleSearchFilter = (e) => {
    // clear checked filter tag
    var radioButton = document.getElementsByName('options');
    for(var i = 0; i < radioButton.length; i++) {
      radioButton[i].checked = false;
    }      

    let query = e.target.value.toLowerCase();
    setFilteredProcedures(procedures.filter( procedure => {
      return procedure.machine[0].vector_name.toLowerCase().includes(query) || procedure.machine[0].manufacturer_name.toLowerCase().includes(query) || procedure.procedure.toLowerCase().includes(query);
    }));
  }

  // //tag filters
  const handleFrequencyFilter = e => {
    // setSelectedTag(e.target.id);
    setFilteredProcedures(e.target.id === 'All' ? procedures : procedures.filter(procedure => (procedure.frequency).toString() === e.target.id));    
  }

  const getFrequencyString = (freq) => {
    let frequencyString;
    switch(freq) {
      case 1: frequencyString = 'Daily'
        break
      case 2: frequencyString = 'Weekly'
        break
      case 3: frequencyString = 'Bimonthly'
        break
      case 4: frequencyString = 'Monthly'
        break
      case 5: frequencyString = 'Quarterly'
        break
      case 6: frequencyString = 'Biyearly'
        break
      case 7: frequencyString = 'Yearly'
        break
    }
    return frequencyString;
  }

  const handleUpdate = (id) => {
    fetch('http://localhost:4000/machines/preventative-maintenance/update/' + id, {
      method: 'POST'
    })
    .then((data) => {
      if (data.status === 200) {
        fetch('http://localhost:4000/machines/preventative-maintenance/')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProcedures(data);
          const newList = filteredProcedures.map((item) => {   
            let updatedItem = data.filter(item => item._id === id);   
            if (item._id === id) {
              console.log('match!')
              let index = filteredProcedures.findIndex(item => item._id === id);
              console.log(index);
              console.log(updatedItem);
              return filteredProcedures[index] = updatedItem[0];             
            }
            return item;          
          });          
          setFilteredProcedures(newList);
        })
      } else {
        console.log('post error')
      }
    })    
    .catch((err) => console.log(err));
  }
  

  // const handleCatTagFilter = e => {
  //   setFilteredProcedures(e.target.id === 'All' ? procedures : procedures.filter(machine => machine.category === e.target.id));
  // }

  // //get filter tags
  const uniqueFrequencies = [...new Set(procedures.map(procedure => procedure.frequency))].sort();
  const uniqueFrequenciesStrings = uniqueFrequencies.map(frequency => getFrequencyString(frequency));
  // const uniqueCategories = [...new Set(procedures.map(machine => machine.category))].sort();  

  //render table
  return (

    <div className='container'>
      
      <div className='TitleRow'>  
        <TitleRow title={'Preventative Maintenance'}/>              
        {!isMachinePage ? <SearchBox filter={handleSearchFilter}/> : null}
      </div>  

      {!isMachinePage ? <PrimaryTags filter={handleFrequencyFilter} uniqueTags={uniqueFrequenciesStrings}/> : null}
      
      { !isLoading ? <Loading loading={'procedures'}/> : 
      <table className='table table-hover align-middle'>
        <thead></thead>
        <tbody>
          {pageProcedures.length > 0 ? pageProcedures.map(procedure => (
            <PrevMaintenanceListItem 
              procedure={procedure} 
              key={procedure._id}
              onUpdate={handleUpdate}
              />
          )): <tr><td><h3>Nothing here 🤔</h3></td></tr>}
        </tbody>
      </table> }

    </div>
  );
}

export default PrevMaintenanceList;