import React, { Component } from "react";
import '../css/Machines.css'

import MachinesListItem from './MachinesListItem';

 class Machines extends Component {
  constructor(props) {
    super(props);
    this.updateFilterState = this.updateFilterState.bind(this);
    this.state = { 
      machines: [],
      filtered: 'All'
    };
  }

  //get data
  componentDidMount() {
    fetch("http://localhost:4000/machines/")
      .then(res => {
        return res.json()               
      })
      .then((data) => {
        this.setState({ machines: data }); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //set filter
  updateFilterState(event) {
    console.log(event.target.id)    
    this.setState({filtered: event.target.id});   
  }
  
  //filter items
  filterItems = () => {
    return this.state.filtered === 'All' ? this.state.machines : this.state.machines.filter(machine => machine.department === this.state.filtered)
  }

  //map filtered table
  machineList() {
    console.log(this.state.machines)
    // console.log(this.filterItems())
    return this.filterItems().map((machine) => {
      return (
        <MachinesListItem
          machine={machine}
          key={machine._id}
        />
      );
    });
  }

  //render table
  render() {    
    return (
      <div className='container'>                
        <div className='TitleRow'>  
          <h1 className='MachinesTitle'>Equipment</h1>      
          <div className="MachinesTags">
            <input value={this.state.filtered} onChange={this.updateFilterState} type="radio" name='options' className="btn-check" id="All" autoComplete="off" />
            <label className="MachinesTag btn btn-outline-secondary" htmlFor="All">All</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type="radio" name='options' className="btn-check" id="Production" autoComplete="off" />
            <label className="MachinesTag btn btn-outline-secondary" htmlFor="Production">Production</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type="radio" name='options' className="btn-check" id="Prepress" autoComplete="off" />
            <label className="MachinesTag btn btn-outline-secondary" htmlFor="Prepress">Prepress</label>

            <input value={this.state.filtered} onChange={this.updateFilterState} type="radio" name='options' className="btn-check" id="Fulfillment" autoComplete="off" />
            <label className="MachinesTag btn btn-outline-secondary" htmlFor="Fulfillment">Fulfillment</label>
            
            <input value={this.state.filtered} onChange={this.updateFilterState} type="radio" name='options' className="btn-check" id="Other" autoComplete="off" />
            <label className="MachinesTag btn btn-outline-secondary" htmlFor="Other">Other</label>
          </div>
        </div>

        <table className="table table-hover align-middle">
          <thead></thead>
          <tbody>{this.machineList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Machines;