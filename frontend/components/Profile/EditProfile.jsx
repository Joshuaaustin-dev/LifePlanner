import "./EditProfile.css";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

function EditProfile({ user, setUser }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      <button className="btn-edit-profile" onClick={openForm}>
        <FaEdit className="me-2" />
        Edit Profile
      </button>

      {/* Form Popup */}
      {isFormOpen && (
        <div className="form-overlay">
          <div className="form-content">
            <EditProfileForm
              onClose={closeForm}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
