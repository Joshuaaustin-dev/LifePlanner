import { useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import profileImage from "../../assets/images/profilePlaceholder.jpg";

function EditProfileForm({ onClose, user, setUser }) {
  const [email] = useState(user.email || "");
  const [name, setName] = useState(user.name || "");
  const [location, setLocation] = useState(user.location || "");
  const [bio, setBio] = useState(user.bio || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/update-profile",
        {
          email,
          newName: name,
          newLocation: location,
          newBio: bio,
        }
      );

      //Update the user dynamically
      setUser((prev) => ({
        ...prev,
        name,
        location,
        bio,
      }));

      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      setMessage("");
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-form">
        <button onClick={onClose} className="btn-close">
          &times;
        </button>
        <h2>Edit Profile</h2>

        {/*update profile message*/}
        {error && <div className="error-msg">{error}</div>}
        {message && <div className="success-msg">{message}</div>}

        {/* Profile Image Section */}
        <div className="profile-image-section">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image-preview"
          />
          <button className="btn-preview-image">Upload</button>
        </div>

        {/* Input Fields */}
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Bio:</label>
        <textarea
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="buttons">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-save">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
