import React from "react";
import { Link } from "react-router-dom";

function MachinesListItem(props) {
  return (
    <tr>
      <td className='MachinesColOne'>
        <img src={props.machine.image} alt={props.vectorName} className='MachinesImage' />      
      </td> 

      <td className='MachinesColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to={"/machines/" + props.machine._id} className='MachinesVectorName'>{props.machine.vectorName}</Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachinesModel'>{props.machine.manufacturerName}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachinesModel'>{props.machine.model}</div>
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
                <div className='MachinesSerial'>{props.machine.serialNumber}</div>
              </td>
            </tr>      
            <tr>
              <td>
                <a href={props.machine.manualUrl} className="btn btn-dark MachinesManualButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Manual</a>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default MachinesListItem;