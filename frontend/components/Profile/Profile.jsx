import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../Hooks/userUser";
import ProfileHead from "./ProfileHead";
import ProfileBody from "./ProfileBody";
import "./Profile.css";

const Profile = () => {
  const { user, setUser } = useUser();
  const [userStore, setUserStore] = useState(null);

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
      <div className="header">
        <h1>Profile</h1>
      </div>
      {user ? (
        <>
          <ProfileHead user={user} setUser={setUser} />
          <ProfileBody skills={user.skills} achievements={user.achievements} />
        </>
      ) : (
        <div className="loading">
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
