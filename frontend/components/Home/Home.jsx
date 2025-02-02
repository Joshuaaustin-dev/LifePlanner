import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const [user, setUser] = useState(null);
  const [userText, setUserText] = useState(null);

  //////////// Use dummy user to retrieve and set in database, replace with real user later
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

  const createUser = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/create-dummy")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };
  const deleteUser = (e) => {
    axios
      .get("http://localhost:5000/delete-dummy")
      .then((response) => {
        setUser({});
        setUser(null);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

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
                        {dayInfo.content} {dayInfo.date}
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

  return (
    <>
      {userText}
      {!user && <button onClick={createUser}>Create User</button>}
      {user && <button onClick={deleteUser}>Delete User</button>}
    </>
  );
};

export default Home;
