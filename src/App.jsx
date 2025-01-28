import { useState } from "react";
import Dashboard from "./components/Dashboard";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <div className="content-wrapper">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
