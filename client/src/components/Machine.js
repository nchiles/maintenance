import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/Machine.css'


function Machine() {
  
  const { slug } = useParams();
  const [machine, setMachine] = useState([]);
  
  useEffect(() => {    
    fetch("http://localhost:4000/machines/" + slug)         
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setMachine(data);
      })
      .catch(err => {console.log(err)
      });
  }, [slug])    

  return (
    <div className=" container MachineCard">
      <div className="MachineCardData">
        <div className="MachineCardImageContainer">
          <img className="MachineImage" src={machine.image} alt="{machine.vectorName}" />
        </div>
        <div className="MachineCardInfoContainer">          
          <div>
            <div className="MachineCardName">{machine.vectorName}</div>
            <div className="MachineCardSerial">{machine.serialNumber}</div>            
          </div>
          <div>
            <div className="MachineModel">{machine.manufacturerName}</div>
            <div className="MachineModel">{machine.model}</div>
          </div>          
          <div className='MachineButtonContainer'>
            <a href={machine.manualUrl} class="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Manual</a>
            <a href={machine.manualUrl} class="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Parts</a>
            <a href={machine.manualUrl} class="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Maintenance</a>
          </div>
        </div>
      </div>
    </div>       
  );
  
}

export default Machine;