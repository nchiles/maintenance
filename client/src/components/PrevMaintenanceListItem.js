import React from "react";
import { Link } from "react-router-dom";
import '../css/PrevMaintenanceList.css';
import manualImage from '../img/manual.png';

function PrevMaintenanceListItem(props) {
  const { frequency, procedure, completed_date, past_due } = props.procedure;
  const { vector_name, _id, manual_url, image } = props.procedure.machine[0];

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
    
  return (
    <tr>
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
                <a href={'#'} className="btn btn-dark PmListManualButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Update</a>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default PrevMaintenanceListItem;