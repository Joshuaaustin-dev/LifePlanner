import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ToDoList.module.css"; // Import CSS Module
import useUser from "../Hooks/userUser";

const ToDoList = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>To-Do List</h2>
      {isLoading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {!isLoading &&
        (goals.length > 0 ? (
          <ul className={styles.list}>
            {goals.map((goal) => (
              <li key={goal.id} className={styles.listItem}>
                {goal.content} -{" "}
                <span className={styles.goalDate}>
                  {goal.date.toDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noGoals}>No upcoming goals.</p>
        ))}
    </div>
  );
};

export default ToDoList;
