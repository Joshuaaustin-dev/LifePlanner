import { useEffect, useState } from "react";
import axios from "axios";
import "./Event.css";

const Event = ({ date }) => {
    const [user, setUser] = useState(null);

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

    if (!user) return <p>Loading...</p>;

    const formattedDate = new Date(date).toISOString().split("T")[0]; 

    const skillsForDay = user.skills
        .map((skill) => ({
            name: skill.name,
            day: skill.day.filter((d) => new Date(d.date).toISOString().split("T")[0] === formattedDate),
        }))
        .filter((skill) => skill.day.length > 0); 

    return (
        <div>
            {skillsForDay.length > 0 ? (
                <ul className="event">
                    {skillsForDay.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                            {skill.day.map((dayInfo, daysIndex) => (
                                <li key={daysIndex}>
                                    <h5>{dayInfo.content}</h5>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default Event;
