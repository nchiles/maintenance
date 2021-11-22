import React from "react";
// import { Link } from "react-router-dom";

function PrevMaintenanceListItem(props) {
  return (
    <tr>
      <td className='PmsColOne'>
        <p className='PmsFrequency'>{props.frequency}</p>
      </td> 

      <td className='MachinesColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <div>{props.procedure}</div>
              </td>
            </tr>
            <tr>
              <td>
              <div>{props.name}</div>
              {/* <Link to={"/machines/" + props.machine._id} className='MachinesVectorName'>{props.vectorName}</Link> */}
              </td>
            </tr>
            <tr>
              <td>
              <div>Manual</div>
              {/* <img src={props.frequency} className='PmsFrequency' />  */}
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
                <div>{props.completedDate}</div>
                {/* <div className='MachinesSerial'>{props.machine.serialNumber}</div> */}
              </td>
            </tr>      
            <tr>
              <td>
                <div>{props.pastDue === true ? 'Past Due' : ''}</div>
                {/* <a href={props.machine.manualUrl} className="btn btn-dark MachinesManualButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Manual</a>       */}
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