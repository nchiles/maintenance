import React from "react";
// import { Link } from "react-router-dom";

function PrevMaintenanceListItem(props) {
  const { frequency, procedure, name, completed_date, past_due} = props.procedure;
  return (
    <tr>
      <td className='PmsColOne'>
        <p className='PmsFrequency'>{frequency}</p>
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
              <div>{name}</div>
              {/* <Link to={"/machines/" + machine._id} className='MachinesVectorName'>{vectorName}</Link> */}
              </td>
            </tr>
            <tr>
              <td>
              <div>Manual</div>
              {/* <img src={frequency} className='PmsFrequency' />  */}
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
                <div>{completed_date}</div>
                {/* <div className='MachinesSerial'>{machine.serialNumber}</div> */}
              </td>
            </tr>      
            <tr>
              <td>
                <div>{past_due === true ? 'Past Due' : ''}</div>
                {/* <a href={machine.manualUrl} className="btn btn-dark MachinesManualButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Manual</a>       */}
              </td>  
            </tr>
            <tr>
              <td>                
                {/* <a href={'#'} className="btn btn-dark MachinesManualButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Update</a>       */}
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default PrevMaintenanceListItem;