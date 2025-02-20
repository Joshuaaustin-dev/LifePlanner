import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Planner from "./components/Planner/Planner";
import Profile from "./components/Profile/Profile";
import Calendar from "./components/Calender/Calender";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* When authenticated show the Navigation Menu*/}
        {isAuthenticated && <NavigationMenu onLogout={handleLogout} />}

        <div className="main-content">
          <Routes>
            {/* Redirect to home if authenticated */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/Home" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* If the user is not authenticated, show login page */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Protected Routes: Only show these if the user is authenticated */}
            {isAuthenticated && (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Planner" element={<Planner />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Calender" element={<Calendar />} />
                <Route
                  path="/Logout"
                  element={<Logout setIsAuthenticated={setIsAuthenticated} />}
                />
              </>
            )}

            {/* Redirect to login if the user tries to access a protected route while not authenticated */}
            <Route
              path="*"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
