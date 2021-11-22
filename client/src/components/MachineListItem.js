import React from 'react';
import { Link } from 'react-router-dom';

function MachineListItem(props) {
  return (
    <tr>
      <td className='MachineListColOne'>
        <img src={props.machine.image} alt={props.vectorName} className='MachineListImage' />      
      </td> 

      <td className='MachineListColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to={'/machines/' + props.machine._id} className='MachineListVectorName'>{props.machine.vectorName}</Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachineListModel'>{props.machine.manufacturerName}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachineListModel'>{props.machine.model}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>

      <td className='MachineListColThree'>
        <table>
          <tbody>
            <tr>
              <td>
                <div className='MachineListSerial'>{props.machine.serialNumber}</div>
              </td>
            </tr>      
            <tr>
              <td>
                <a href={props.machine.manualUrl} className='btn btn-dark MachineListManualButton' role='button' aria-disabled='true' target='_blank' rel='noopener noreferrer'>Manual</a>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default MachineListItem;