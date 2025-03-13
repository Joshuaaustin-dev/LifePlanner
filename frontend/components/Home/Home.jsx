import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userText, setUserText] = useState(null);
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
      setUserText(
        <div className="main">
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Skills</h3>
          <hr />
          <ol>
            {user.skills.map((skill, skillIndex) => (
              <li key={skillIndex}>
                <h4>{skill.name}</h4>
                <ul>
                  {skill.day.map((dayInfo, daysIndex) => (
                    <li key={daysIndex}>
                      <h5>
                        ({new Date(dayInfo.date).toLocaleDateString()}) {dayInfo.content}
                      </h5>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      );
    } else {
      setUserText(null);
    }
  }, [user]);

  return <>{userText}</>;
};

export default Home;
