import Goals from "./Goals";
import ToDoList from "./ToDoList";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <div className="goals-container">
          <Goals />
        </div>
        <div className="todo-container">
          <ToDoList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
