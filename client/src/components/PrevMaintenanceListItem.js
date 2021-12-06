import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/PrevMaintenanceList.css';
import manualImage from '../img/manual.png';
import { useParams } from 'react-router-dom';

function PrevMaintenanceListItem(props) {
  const { frequency, procedure, completed_date, past_due } = props.procedure;
  const { vector_name, _id, manual_url, image } = props.procedure.machine[0];
  const [updatedDate, setUpdatedDate] = useState();
  const { slug } = useParams();

  // useEffect(() => {
  //   console.log('useEffect called!')
  //   const fetchData = async () => {
  //     const res = await fetch('http://localhost:4000/machines/preventative-maintenance/update/:id');
  //     const data = await res.json();
  //     // console.log(data)
  //     setUpdatedDate(data);          
  //     // set filtered procedures based on url 
  //     // setFilteredProcedures(slug === undefined ? data : data.filter(procedure => procedure.machine[0]._id === slug));
  //     // setIsLoading(true);        
  //   };
  //   fetchData();
  // }, [])

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

  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = (new Date(completed_date)).toLocaleDateString("en-US", options)

  // document.getElementById('PmProcedureRow').style.property = 'background-color: red';

  return (
    <tr id='PmProcedureRow'>
      <td className='PmListColOne'>
        <div className='PmListFrequency'>{getFrequencyString(frequency)}</div>
      </td> 

      <td className='PmListColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <div className='PmsListProcedure'>{procedure}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='PmListVectorName'>{vector_name}</div>
                <div className='PmListImgLinkContainer'>
                  <Link to={"/machines/" + _id}><img src={image} className='PrevMaintImg' /></Link>
                  <a href={manual_url} className='MachinesVectorName' target='_blank' rel='noopener noreferrer'><img src={manualImage} className='PrevMaintImg' /></a>
                </div>          
              </td>
            </tr>
          </tbody>
        </table>
      </td>

      <td className='PmListColThree'>
        <table>
          <tbody>
            <tr>
              <td>
                <div className='PmListCompletedDate'>{formattedDate}</div>              
              </td>
            </tr>      
            <tr>
              <td>
                <div className='PmListPastDue'>{past_due === true ? 'Past Due' : ''}</div>
              </td>  
            </tr>
            <tr>
              <td>                
                <button onClick={() => props.onUpdate(props.procedure._id)} className="btn btn-dark PmListManualButton">Update</button>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default PrevMaintenanceListItem;