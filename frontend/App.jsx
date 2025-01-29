import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Planner from "./components/Planner/Planner";
import Profile from "./components/Profile/Profile";
import Calendar from "./components/Calender/Calender";
function App() {
  return (
    <div className="App">
      <Dashboard/>
      <Router>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Planner" element={<Planner />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Calender" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
