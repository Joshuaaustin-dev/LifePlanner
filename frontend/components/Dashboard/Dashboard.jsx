import Goals from "./Goals";
import ToDoList from "./ToDoList";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <header className="dashboard-container">
        <h1>Dashboard</h1>
      </header>
      <main>
        <section className="goals-container">
          <Goals />
        </section>
        <section className="todo-list-conainer">
          <ToDoList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
