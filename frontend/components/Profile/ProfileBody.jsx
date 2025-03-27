import { useState } from "react";
import { BsClipboard2Data } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import "./ProfileBody.css";

const ProfileBody = ({ skills = [], achievements = [] }) => {
  // Skills in progress and completed count
  const skillsInProgress = skills.filter((skill) => !skill.completed).length;
  const skillsCompleted = skills.filter((skill) => skill.completed).length;

  // Achievements count
  const achievementsCount = achievements.length;

  // Manage active section
  const [activeSection, setActiveSection] = useState("skillsInProgress");

  const Skills = ({ skills }) => {
    return (
      <div className="skills">
        <h3>Skills In Progress</h3>
        <ul>
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill.name}</li>)
          ) : (
            <p>No skills added yet.</p>
          )}
        </ul>
      </div>
    );
  };

  const SkillsCompleted = ({ skills }) => {
    return (
      <div className="skills">
        <h3>Skills Completed</h3>
        <ul>
          <p>No skills added yet.</p>
        </ul>
      </div>
    );
  };

  const Achievements = ({ achievements }) => {
    return (
      <div className="achievements">
        <h3>Achievements</h3>
        <ul>
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))
          ) : (
            <p>No achievements yet.</p>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="profile-body container m-5">
      {/* Row with three columns for counts */}
      <div className="row m-4">
        {/* Skills In Progress Header section */}
        <div
          className={`col-12 col-md-4 d-flex align-items-center ${
            activeSection === "skillsInProgress" ? "active" : ""
          }`}
          onClick={() => setActiveSection("skillsInProgress")}
        >
          <BsClipboard2Data size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills In Progress</h5>
            <p>{skillsInProgress}</p>
          </div>
        </div>

        {/* Skills Completed Header section */}
        <div
          className={`col-12 col-md-4 d-flex align-items-center ${
            activeSection === "skillsCompleted" ? "active" : ""
          }`}
          onClick={() => setActiveSection("skillsCompleted")}
        >
          <BsClipboard2Check size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills Completed</h5>
            <p>{skillsCompleted}</p>
          </div>
        </div>

        {/* Achievements Header Section */}
        <div
          className={`col-12 col-md-4 d-flex align-items-center ${
            activeSection === "achievements" ? "active" : ""
          }`}
          onClick={() => setActiveSection("achievements")}
        >
          <GrAchievement size={60} className="me-4" />
          <div className="count-box">
            <h5>Achievements</h5>
            <p>{achievementsCount}</p>
          </div>
        </div>
      </div>

      {/* Show/Hide Sections based on active state */}
      {activeSection === "skillsInProgress" && <Skills skills={skills} />}
      {activeSection === "skillsCompleted" && (
        <SkillsCompleted skills={skills} />
      )}
      {activeSection === "achievements" && (
        <Achievements achievements={achievements} />
      )}
    </div>
  );
};

export default ProfileBody;
