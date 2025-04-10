import { useState, useRef, useEffect } from "react";
import { BsClipboard2Data, BsClipboard2Check } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import "./ProfileBody.css";

const ProfileBody = ({ skills = [], achievements = [] }) => {
  // Skills in progress and completed count
  const skillsInProgress = skills.filter((skill) =>
    skill.day.some((day) => day.completed === false)
  );

  const skillsCompleted = skills.filter((skill) =>
    skill.day.every((day) => day.completed === true)
  );

  // Achievements count
  const achievementsCount = achievements.length;

  // Manage active section
  const [activeSection, setActiveSection] = useState("skillsInProgress");

  // Refs for positioning
  const tabRefs = {
    skillsInProgress: useRef(null),
    skillsCompleted: useRef(null),
    achievements: useRef(null),
  };

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0px",
    width: "0px",
  });

  // Update indicator position on state change
  useEffect(() => {
    if (tabRefs[activeSection]?.current) {
      const tab = tabRefs[activeSection].current;
      setIndicatorStyle({
        left: `${tab.offsetLeft}px`,
        width: `${tab.offsetWidth}px`,
      });
    }
  }, [activeSection]);

  const Skills = ({ skills }) => {
    return (
      <div className="skills">
        <h3>Skills In Progress</h3>
        <ul>
          {skillsInProgress.length > 0 ? (
            skillsInProgress.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </ul>
      </div>
    );
  };

  const SkillsCompleted = ({ skills }) => {
    const completedSkills = skills.filter((skill) =>
      skill.day.every((day) => day.completed === true)
    );

    return (
      <div className="skills">
        <h3>Skills Completed</h3>
        <ul>
          {completedSkills.length > 0 ? (
            completedSkills.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))
          ) : (
            <p>No skills completed yet.</p>
          )}
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
      <div className="row m-4 position-relative">
        {/* Indicator Bar */}
        <div className="tab-indicator" style={indicatorStyle}></div>

        {/* Skills In Progress tab */}
        <div
          ref={tabRefs.skillsInProgress}
          className={`title-box col-12 col-md-4 d-flex align-items-center ${
            activeSection === "skillsInProgress" ? "active" : ""
          }`}
          onClick={() => setActiveSection("skillsInProgress")}
        >
          <BsClipboard2Data size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills In Progress</h5>
            <p>{skillsInProgress.length}</p>
          </div>
        </div>

        {/* Skills Completed tab */}
        <div
          ref={tabRefs.skillsCompleted}
          className={`title-box col-12 col-md-4 d-flex align-items-center ${
            activeSection === "skillsCompleted" ? "active" : ""
          }`}
          onClick={() => setActiveSection("skillsCompleted")}
        >
          <BsClipboard2Check size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills Completed</h5>
            <p>{skillsCompleted.length}</p>{" "}
          </div>
        </div>

        {/* Achievements Header tab */}
        <div
          ref={tabRefs.achievements}
          className={`title-box col-12 col-md-4 d-flex align-items-center ${
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
