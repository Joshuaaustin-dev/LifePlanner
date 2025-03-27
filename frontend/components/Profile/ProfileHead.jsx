import profileImage from "../../assets/images/profilePlaceholder.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import EditProfile from "./EditProfile";

const ProfileHead = ({ user }) => {
  return (
    <div className="profile-head container-fluid px-5 my-5">
      <div className="row no-gutters">
        {/* column for Profile Picture */}
        <div className="col-12 col-md-4 text-center">
          <div className="profile-picture mb-3">
            <img
              src={profileImage}
              alt="Profile Image"
              className="img-fluid rounded-circle"
            />
            {/* User's Streak */}
            <div className="streak-section">
              <p>
                <MdOutlineLocalFireDepartment size="30" /> {user.loginStreak}
              </p>
            </div>
          </div>
          {/* Change Picture" button here */}
        </div>

        {/*User Details Column */}
        <div className="col-12 col-md-8">
          <div className="row d-flex justify-content-between align-items-center">
            <h1 className="col-8">{user.name}</h1>
            <div className="col-4 text-end">
              <EditProfile />
            </div>
          </div>

          {/* Users Details */}
          <div className="users-details mb-3">
            <p>
              <IoLocationOutline /> {user.location}
            </p>
          </div>

          {/* User's Bio */}
          <div className="user-bio">
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
          </div>

          {/*More user info*/}
          <div className="more-info">
            <p>
              <strong>Member since:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
