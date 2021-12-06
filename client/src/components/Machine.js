import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/Machine.css';
import '../css/PrevMaintenanceList.css';
import PrevMaintenanceList from "./PrevMaintenanceList";
import Loading from "./Loading";


function Machine() {
  
  const { slug } = useParams();
  const [ machine, setMachine] = useState([]);
  const [ pmFilter, setPmFilter ] = useState([]);
  const { image, vector_name, serial_number, manufacturer_name, model, manual_url, parts_url } = machine;
  // const { isLoading, setIsLoading } = useState(false)
  
  useEffect(() => {
    console.log(slug)
    fetch("http://localhost:4000/machines/" + slug)         
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setMachine(data);
        // setIsLoading(true);
      })
      .catch(err => {console.log(err)
      });
  }, [slug]) 
  
  
  console.log(slug);

  return (
    // !isLoading ? <Loading loading={'equipment'}/> :
    <div>
      <div className=" container MachineCard">
        <div className="MachineCardData">
          <div className="MachineCardImageContainer">
            <img className="MachineImage" src={image} alt="{vectorName}" />
          </div>
          <div className="MachineCardInfoContainer">          
            <div>
              <div className="MachineCardName">{vector_name}</div>
              <div className="MachineCardSerial">{serial_number}</div>            
            </div>
            <div>
              <div className="MachineModel">{manufacturer_name}</div>
              <div className="MachineModel">{model}</div>
            </div>          
            <div className='MachineButtonContainer'>
              <a href={manual_url} className="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Manual</a>
              <a href={parts_url} className="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Parts</a>
              <a href={'#'} className="btn btn-dark btn-lg MachineCardButton" role="button" aria-disabled="true" target="_blank" rel="noopener noreferrer">Maintenance</a>
            </div>
          </div>
        </div>
      </div> 
      <PrevMaintenanceList />  
    </div>    
  );
  
}

export default Machine;