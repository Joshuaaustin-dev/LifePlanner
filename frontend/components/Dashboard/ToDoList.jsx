import { useState, useEffect } from "react";
import axios from "axios";
import "./ToDoList.css"; 

const ToDoList = () => {
    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState([]);
    const [userStore, setUserStore] = useState(null);

    useEffect(() => {
        setUserStore(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        if (userStore) {
            axios
                .post("http://localhost:5000/get-user", { email: userStore.email })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [userStore]);

    useEffect(() => {
        if (user && user.skills) {
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0];

            const filteredGoals = user.skills
                .flatMap((skill) =>
                    skill.day
                        .filter((d) => new Date(d.date) >= new Date(formattedDate)) 
                        .map((dayInfo) => ({
                            id: dayInfo._id,
                            content: dayInfo.content,
                            completed: dayInfo.completed || false,
                            date: new Date(dayInfo.date),
                        }))
                )
                .sort((a, b) => a.date - b.date); 

            const nextThreeGoals = filteredGoals.slice(0, 3);
            setGoals(nextThreeGoals);
        }
    }, [user]);

    return (
        <div>
            <main>
                <div className="ToDoList-border">
                    <h2>ToDo List</h2>
                    {goals.length > 0 ? (
                        <ul>
                            {goals.map((goal) => (
                                <li key={goal.id}>
                                    <span className={goal.completed ? "line-through" : ""}>
                                        {goal.content} - {goal.date.toDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming goals.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ToDoList;
