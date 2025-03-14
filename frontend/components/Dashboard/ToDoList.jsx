import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ToDoList.module.css"; // Import CSS Module

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
                            date: new Date(dayInfo.date),
                        }))
                )
                .sort((a, b) => a.date - b.date);

            setGoals(filteredGoals.slice(0, 3));
        }
    }, [user]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>To-Do List</h2>
            {goals.length > 0 ? (
                <ul className={styles.list}>
                    {goals.map((goal) => (
                        <li key={goal.id} className={styles.listItem}>
                            {goal.content} - <span className={styles.goalDate}>{goal.date.toDateString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noGoals}>No upcoming goals.</p>
            )}
        </div>
    );
};

export default ToDoList;
