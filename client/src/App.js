import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MachineList from "./components/MachineList";
import Machine from "./components/Machine";
import PrevMaintenanceList from "./components/PrevMaintenanceList";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='machines' element={<MachineList/>}/>
          <Route path='machines/:slug' element={<Machine/>}/>
          <Route path='machines/preventative-maintenance' element={<PrevMaintenanceList/>}/>
        </Routes>
      </Router>
    </div>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default App;