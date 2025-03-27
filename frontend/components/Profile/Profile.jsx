import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
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

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h1>{user.name}'s Profile</h1>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>

          <h3>Skills</h3>
          <ul>
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))
            ) : (
              <p>No skills added yet.</p>
            )}
          </ul>

          <h3>Achievements</h3>
          <ul>
            {user.achievements && user.achievements.length > 0 ? (
              user.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))
            ) : (
              <p>No achievements yet.</p>
            )}
          </ul>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
