import "./EditProfile.css";
import profileImage from "../../assets/images/profilePlaceholder.jpg";

function EditProfileForm({ onClose }) {
  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-form">
        <button onClick={onClose} className="btn-close">
          &times;
        </button>
        <h2>Edit Profile</h2>

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
        <input type="text" placeholder="Enter your name" />

        <label>Location:</label>
        <input type="text" placeholder="Enter your location" />

        <label>Bio:</label>
        <textarea placeholder="Tell us about yourself"></textarea>

        {/* Buttons */}
        <div className="buttons">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button className="btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
