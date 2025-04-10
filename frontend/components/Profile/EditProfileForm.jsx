import { useState, useRef } from "react";
import axios from "axios";
import "./EditProfile.css";
import profileImagePlaceholder from "../../assets/images/profilePlaceholder.jpg";

function EditProfileForm({ onClose, user, setUser }) {
  const [email] = useState(user.email || "");
  const [name, setName] = useState(user.name || "");
  const [location, setLocation] = useState(user.location || "");
  const [bio, setBio] = useState(user.bio || "");
  const [profileImage, setProfileImage] = useState(user.profilePicture || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //max image size 10 mb limit
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

  //Handle new file uploads for profile picture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      //handle larger than max image size
      if (file.size > MAX_IMAGE_SIZE) {
        setError(
          "The file is too large. Please upload an image smaller than 10MB."
        );
        setProfileImage("");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        //use Base64 string for profileImage
        setProfileImage(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  //Handle deletion of pictures
  const handleDeletePicture = () => {
    setProfileImage("");
  };

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
          newProfilePicture: profileImage || "",
        }
      );

      //Update the user dynamically
      setUser((prev) => ({
        ...prev,
        name,
        location,
        bio,
        profilePicture: profileImage,
      }));

      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Profile update failed, Image must be less than 10 MB"
      );
      setMessage("");
    }

    console.log("Sending profile picture:", profileImage);
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
            src={profileImage || profileImagePlaceholder}
            alt="Profile"
            className="profile-image-preview"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
          />
          {/* Show Delete button only if there's an image */}
          {profileImage && (
            <button
              onClick={handleDeletePicture}
              className="btn-delete-picture"
            >
              Delete Picture
            </button>
          )}
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
