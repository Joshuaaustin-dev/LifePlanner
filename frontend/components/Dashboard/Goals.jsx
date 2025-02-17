import { useState, useEffect } from "react";
import axios from "axios";
import "./Goals.css";

const Goals = () => {
    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        axios
            .get("http://localhost:5000/dummy") 
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, []);

    useEffect(() => {
        if (user && user.skills) {
            const formattedDate = selectedDate.toISOString().split("T")[0];

            const filteredGoals = user.skills
                .flatMap((skill) =>
                    skill.day
                        .filter((d) => new Date(d.date).toISOString().split("T")[0] === formattedDate)
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

            // Update the goal's completion status in the UI
            setGoals((prevGoals) =>
                prevGoals.map((goal) =>
                    goal.id === goalId ? { ...goal, completed: !currentStatus } : goal
                )
            );
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };

    return (
        <div>
            <main>
                <div className="goals-border">
                    <h2>Goals for Today</h2>
                    {goals.length > 0 ? (
                        <ul>
                            {goals.map((goal) => (
                                <li key={goal.id}>
                                    <input
                                        type="checkbox"
                                        checked={goal.completed}
                                        onChange={() => toggleGoalCompletion(goal.id, goal.completed)}
                                    />
                                    <span className={goal.completed ? "line-through" : ""}>
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
