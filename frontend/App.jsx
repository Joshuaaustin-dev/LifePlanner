import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Planner from "./components/Planner/Planner";
import Profile from "./components/Profile/Profile";
import Calendar from "./components/Calender/Calender";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationMenu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Planner" element={<Planner />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Calender" element={<Calendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
