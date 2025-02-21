import Goals from "./Goals";
import ToDoList from "./ToDoList";
import "./Dashboard.css";
import HorizontalBarChart from "./HorizontalBarChart";
const Dashboard = () => {
  return (
    <div>
      <header className="dashboard-container">
        <h1>Dashboard</h1>
      </header>
      <main>
        <section className="column-container">
          <section className="goals-container">
            <Goals />
          </section>
          <section className="horizontalBarChart">
            <HorizontalBarChart />
          </section>
        </section>

        <section className="todo-list-container">
          <ToDoList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
