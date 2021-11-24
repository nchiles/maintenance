import React from 'react';
import { Link } from 'react-router-dom';

function MachineListItem(props) {
  const {image, vector_name, _id, manufacturer_name, model, serial_number, manual_url} = props.machine;
  return (
    <tr>
      <td className='MachineListColOne'>
        <img src={image} alt={props.vector_name} className='MachineListImage' />      
      </td> 

      <td className='MachineListColTwo'>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to={'/machines/' + _id} className='MachineListVectorName'>{vector_name}</Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachineListModel'>{manufacturer_name}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='MachineListModel'>{model}</div>
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
                <div className='MachineListSerial'>{serial_number}</div>
              </td>
            </tr>      
            <tr>
              <td>
                <a href={manual_url} className='btn btn-dark MachineListManualButton' role='button' aria-disabled='true' target='_blank' rel='noopener noreferrer'>Manual</a>      
              </td>  
            </tr>
          </tbody>
        </table>
      </td>
  </tr>
  )
}

export default MachineListItem;