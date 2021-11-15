import React, { Component } from 'react';
import '../css/PrevMaintenanceList.css'

import PrevMaintenanceListItem from './PrevMaintenanceListItem';

class MaintenanceProceduresList extends Component {
  constructor(props) {
    super(props);
    // this.updateFilterState = this.updateFilterState.bind(this);
    this.state = { 
      machines: [],
      procedures: [],
      filtered: 'All'
    };
  }

  //get data
  componentDidMount() {
    fetch('http://localhost:4000/machines/preventative-maintenance')
      .then(res => {
        return res.json()               
      })
      .then((data) => {
        const prevMaintArrs = data.map((machine) => { return machine.preventativeMaintenance })
        console.log(prevMaintArrs.flat())
        this.setState({ machines: data, procedures: prevMaintArrs.flat() });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // //set filter
  // updateFilterState(event) {
  //   console.log(event.target.id)    
  //   this.setState({filtered: event.target.id});   
  // }
  
  // //filter items
  // filterItems = () => {
  //   return this.state.filtered === 'All' ? this.state.machines : this.state.machines.filter(machine => machine.department === this.state.filtered)
  // }

  //map filtered table
  procedureList() {
    console.log(this.state.machines)
    return this.state.procedures.map((procedure) => {
      return (
        <PrevMaintenanceListItem
          procedure={procedure.procedure}
          frequency={procedure.frequency}
          name={procedure.vectorMachineName}
          completedDate={procedure.completedDate}
          pastDue={procedure.pastDue}
          key={procedure.id}
        />
      );
    });
  }

  //render table
  render() {    
    return (
      <div className='container'>                
        <div className='TitleRow'>  
          <h1 className='MachinesTitle'>Maintenance Procedures</h1>      
          {/* <div className='MachinesTags'>
            <input value={this.state.filtered} onChange={this.updateFilterState} type='radio' name='options' className='btn-check' id='All' autoComplete='off' />
            <label className='MachinesTag btn btn-outline-secondary' htmlFor='All'>All</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type='radio' name='options' className='btn-check' id='Production' autoComplete='off' />
            <label className='MachinesTag btn btn-outline-secondary' htmlFor='Production'>Production</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type='radio' name='options' className='btn-check' id='Prepress' autoComplete='off' />
            <label className='MachinesTag btn btn-outline-secondary' htmlFor='Prepress'>Prepress</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type='radio' name='options' className='btn-check' id='Fulfillment' autoComplete='off' />
            <label className='MachinesTag btn btn-outline-secondary' htmlFor='Fulfillment'>Fulfillment</label>
            
            <input value={this.state.filtered} onChange={this.updateFilterState} type='radio' name='options' className='btn-check' id='Other' autoComplete='off' />
            <label className='MachinesTag btn btn-outline-secondary' htmlFor='Other'>Other</label>
          </div> */}
        </div>

        <table className='table table-hover align-middle'>
          <thead></thead>
          <tbody>{this.procedureList()}</tbody>
        </table>
      </div>
    );
  }
}

export default MaintenanceProceduresList;