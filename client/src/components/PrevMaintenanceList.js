import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PrevMaintenanceList.css';
import PrevMaintenanceListItem from './PrevMaintenanceListItem';
import PrimaryTags from './PrimaryTags';
import TitleRow from './TitleRow';
import Loading from './Loading';


const PrevMaintenanceList = () => {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // filtered state should have frequency, render page, search result


  useEffect(() => {
    console.log('useEffect called!')
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/machines/preventative-maintenance/');
      const data = await res.json();
      // console.log(data)
      setProcedures(data);          
      // set filtered procedures based on url 
      setFilteredProcedures(slug === undefined ? data : data.filter(procedure => procedure.machine[0]._id === slug));
      setIsLoading(true);        
    };
    fetchData();
  }, [])

  // const sortedProcedures = filteredProcedures
  // .sort((a, b) => {
  //   if (a.frequency > b.frequency) return 1;
  //   // if (a.machine[0].vector_name > b.machine[0].vector_name) return 1;
  //   return 0;
  // })

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
    setSelectedTag(e.target.id);
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
          return data;
        })
        .then((updatedData) => {
          const newList = filteredProcedures.map((item) => {   
            let updatedItem = updatedData.filter(item => item._id === id);   
            if (item._id === id) {
              console.log('match!')
              let index = filteredProcedures.findIndex(item => item._id === id);
              console.log(index);
              console.log(updatedItem);
              return filteredProcedures[index] = updatedItem[0];             
            }
            return item;          
          });          
          return newList;
        })
        .then((updatedList) => {
          console.log(updatedList)
          setFilteredProcedures(updatedList);
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
    !isLoading ? <Loading loading={'procedures'}/> :
    <div className='container'>                  
      <TitleRow title={'Preventative Maintenance'} filter={handleSearchFilter}/>      
      <PrimaryTags filter={handleFrequencyFilter} uniqueTags={uniqueFrequenciesStrings}/>
      <div className='MachineListDeptTags'>
        {/* <span key='All' className='MachineListDeptTagWrapper'>
          <input onChange={handleDeptTagFilter} type='radio' name='options' className='btn-check' id='All' autoComplete='off' />
          <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor='All' >All</label>
        </span> */}
        
        {/* {
          uniqueFrequencies.map((freq) => {
            return (
              <span key={freq} className='MachineListDeptTagWrapper'>
                <input onChange={handleFrequencyFilter} type='radio' name='options' className='btn-check' id={freq} autoComplete='off'/>
                <label className='MachineListDeptTag btn btn-outline-secondary' htmlFor={freq}>{getFrequencyString(freq)}</label>
              </span>
            )
          })
        } */}
      </div>
      {/* <div className='MachineListCatTags'>
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
      </div>
      */}
      <table className='table table-hover align-middle'>
        <thead></thead>
        <tbody>
          {filteredProcedures.length > 0 ? filteredProcedures.map(procedure => (
            <PrevMaintenanceListItem 
              procedure={procedure} 
              key={procedure._id}
              onUpdate={handleUpdate}
              />
          )): <tr><td><h3>Nothing found, try again</h3></td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default PrevMaintenanceList;