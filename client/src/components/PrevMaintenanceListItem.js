import React from "react";
import { Link } from "react-router-dom";

function PrevMaintenanceListItem(props) {
  const { frequency, procedure, completed_date, past_due } = props.procedure;
  const { vector_name, _id, manual_url } = props.procedure.machine[0];

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

  const formattedDate = (new Date(completed_date)).toLocaleDateString("en-US")
    
  return (
    <tr>
      <td className='PmsColOne'>
        <p className='PmsFrequency'>{getFrequencyString(frequency)}</p>
      </td> 

      <td className='MachinesColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <div>{procedure}</div>
              </td>
            </tr>
            <tr>
              <td>              
                <Link to={"/machines/" + _id} className='MachinesVectorName'>{vector_name}</Link>
              </td>
            </tr>
            <tr>
              <td>
                <a href={manual_url} className='MachinesVectorName' target='_blank' rel='noopener noreferrer'>Manual</a>
              </td>              
            </tr>
          </tbody>
        </table>
      </td>

      <td className='MachinesColThree'>
        <table>
          <tbody>
            <tr>
              <td>
                <div>{formattedDate}</div>              
              </td>
            </tr>      
            <tr>
              <td>
                <div>{past_due === true ? 'Past Due' : ''}</div>
              </td>  
            </tr>
            <tr>
              <td>                
                <a href={'#'} className="btn btn-dark" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Update</a>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default PrevMaintenanceListItem;