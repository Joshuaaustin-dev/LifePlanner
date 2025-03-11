import { useState } from "react";
import Goals from "./Goals";
import ToDoList from "./ToDoList";
import HorizontalBarChart from "./HorizontalBarChart";
import "./Dashboard.css";

const Dashboard = () => {
    const [goalUpdateTrigger, setGoalUpdateTrigger] = useState(0);

    const handleGoalUpdate = () => {
        setGoalUpdateTrigger((prev) => prev + 1); 
    };

    return (
        <div>
            <header className="dashboard-container">
                <h1>Dashboard</h1>
            </header>
            <main>
                <section className="column-container">
                    <section className="goals-container">
                        <Goals onGoalUpdate={handleGoalUpdate} />
                    </section>
                    <section className="horizontalBarChart">
                        <HorizontalBarChart updateTrigger={goalUpdateTrigger} />
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
