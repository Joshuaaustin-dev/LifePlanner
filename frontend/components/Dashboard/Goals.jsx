import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Goals.module.css"; // Import the CSS module

const Goals = ({ onGoalUpdate }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userStore, setUserStore] = useState(null);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/get-user",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // set user
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  useEffect(() => {
    if (user && user.skills) {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const filteredGoals = user.skills.flatMap((skill) =>
        skill.day
          .filter(
            (d) =>
              new Date(d.date).toISOString().split("T")[0] === formattedDate
          )
          .map((dayInfo) => ({
            id: dayInfo._id,
            content: dayInfo.content,
            completed: dayInfo.completed || false,
          }))
      );

      setGoals(filteredGoals);
    }
  }, [user, selectedDate]);

  const toggleGoalCompletion = async (goalId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/update-goal/${goalId}`, {
        completed: !currentStatus,
      });

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !currentStatus } : goal
        )
      );

      if (onGoalUpdate) {
        onGoalUpdate();
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div>
      <main>
        <div className={styles.goalsContainer}>
          <h2 className={styles.title}>Goals for Today</h2>
          {goals.length > 0 ? (
            <ul className={styles.list}>
              {goals.map((goal) => (
                <li key={goal.id} className={styles.listItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={goal.completed}
                    onChange={() =>
                      toggleGoalCompletion(goal.id, goal.completed)
                    }
                  />
                  <span className={goal.completed ? styles.completed : ""}>
                    {goal.content}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No goals for this day.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Goals;
