import "./EditProfile.css";

import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

function EditProfile() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      <button className="btn-edit-profile" onClick={openForm}>
        Edit Profile
      </button>

      {/* Form Popup */}
      {isFormOpen && (
        <div className="form-overlay">
          <div className="form-content">
            <EditProfileForm onClose={closeForm} />
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
