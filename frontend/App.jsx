import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Planner from "./components/Planner/Planner";
import Profile from "./components/Profile/Profile";
import Calendar from "./components/Calender/Calender";
import Shop from "./components/Shop/Shop";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import CreateNewUser from "./components/Login/CreateNewUser";
import ResetPassword from "./components/Login/ResetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const checkAuth = () => {
    axios
      .post(
        "http://localhost:5000/check-auth",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsAuthenticated(false); // Handle error case by setting to false
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the check is complete
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Do not render routes until the authentication check is done
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  const handleLogout = () => {
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
            <Route path="/create-account" element={<CreateNewUser />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Protected Routes: Only show these if the user is authenticated */}
            {isAuthenticated && (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Planner" element={<Planner />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Calender" element={<Calendar />} />
                <Route path="/Shop" element={<Shop />} />

                <Route
                  path="/Logout"
                  element={<Logout setIsAuthenticated={setIsAuthenticated} />}
                />
              </>
            )}
            {/* Redirect to login if the user tries to access a protected route while not authenticated */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <Navigate to="/Home" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
