import { useState } from "react";
import profileImagePlaceholder from "../../assets/images/profilePlaceholder.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalFireDepartment } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import EditProfile from "./EditProfile";

const ProfileHead = ({ user, setUser }) => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="profile-head container-fluid px-5 my-5 rounded-3 shadow-sm p-4 mb-4">
      <div className="row">
        {/* column for Profile Picture */}
        <div className="col-12 col-md-4 text-center">
          <div className="profile-picture position-relative mb-3 d-inline-block">
            <img
              src={user.profilePicture || profileImagePlaceholder}
              alt="Profile Image"
              className="img-fluid rounded-circle profile-image shadow"
            />
            {/* User's Streak */}
            <div
              className="streak-section position-absolute top-0 end-0 p-2"
              style={{ transform: "translate(25%, -25%)" }}
            >
              <MdLocalFireDepartment size="20" />
              <span className="ms-1 fw-bold">{user.loginStreak}</span>
            </div>
          </div>
          {/* Change Picture" button here */}
        </div>

        {/*User Details Column */}
        <div className="col-12 col-md-8">
          <div className="row d-flex justify-content-between align-items-center mb-3">
            <h1 className="col-8 fw-bold mb-0">{user.name}</h1>
            <div className="col-4 text-end">
              {/* EditProfile component with user prop */}
              <EditProfile user={user} setUser={setUser} />
            </div>
          </div>

          {/* Users Details */}
          <div className="users-details mb-3">
            <p className="d-flex align-items-center mb-2">
              <IoLocationOutline size={20} />
              <span>{user.location || "Location not set"}</span>
            </p>
            {/*How long they've had their account*/}
            <p className="d-flex align-items-center mb-2">
              <FaCalendarAlt className="me-2" size={16} />
              <span>
                Member since:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </span>
            </p>
          </div>

          {/* User's Bio */}
          <div className="user-bio p-3 rounded-3 mb-3">
            <h5 className="mb-2">Bio</h5>
            <p className="mb-0">{user.bio || "No bio provided yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
