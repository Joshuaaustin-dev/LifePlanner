import { useState, useRef, useEffect } from "react";
import { BsClipboard2Data, BsClipboard2Check } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { MdRocketLaunch } from "react-icons/md";
import { FaMedal } from "react-icons/fa";
import confetti from "canvas-confetti";
import "./ProfileBody.css";

const ProfileBody = ({ skills = [], achievements = [] }) => {
  // Skills in progress and completed count
  const skillsInProgress = skills.filter((skill) =>
    skill.day.some((day) => day.completed === false)
  );

  const skillsCompleted = skills.filter((skill) =>
    skill.day.every((day) => day.completed === true)
  );

  // Achievements logic
  const generatedAchievements = [];

  //confetti effect for achievement cards
  const handleConfetti = () => {
    confetti({
      particleCount: 40,
      startVelocity: 20,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // First Skill Generated
  if (skillsInProgress.length > 0 || skillsCompleted.length > 0) {
    generatedAchievements.push({
      icon: <MdRocketLaunch size={40} color="black" />,
      name: "First Skill Generated",
      description: "You've started your first skill!",
    });
  }

  // First Skill Completed
  if (skillsCompleted.length > 0) {
    generatedAchievements.push({
      icon: <FaMedal size={40} color="black" />,
      name: "First Skill Completed",
      description: "You completed your first skill—great job!",
    });
  }

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
        <ul>
          {skillsInProgress.length > 0 ? (
            skillsInProgress.map((skill, index) => (
              <li key={index} className="card shadow-sm p-3 h-100 text-center">
                <div className="card-body">
                  <h5 className="card-title">{skill.name}</h5>
                </div>
              </li>
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
        <ul>
          {completedSkills.length > 0 ? (
            completedSkills.map((skill, index) => (
              <li key={index} className="card shadow-sm p-3 h-100 text-center">
                <div className="card-body">
                  <h5 className="card-title">{skill.name}</h5>
                </div>
              </li>
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
        <div className="row">
          {achievements.length > 0 ? (
            achievements.map((achieve, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 mb-4"
                onMouseEnter={handleConfetti}
              >
                <div className="card shadow-sm p-3 h-100 text-center">
                  <div className="mb-3 text-primary">{achieve.icon}</div>
                  <h5 className="card-title">{achieve.name}</h5>
                  <p className="card-text">{achieve.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No achievements yet.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white profile-body container m-5 mt-1">
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
              <p>{generatedAchievements.length}</p>
            </div>
          </div>
        </div>

        {/* Show/Hide Sections based on active state */}
        {activeSection === "skillsInProgress" && <Skills skills={skills} />}
        {activeSection === "skillsCompleted" && (
          <SkillsCompleted skills={skills} />
        )}
        {activeSection === "achievements" && (
          <Achievements achievements={generatedAchievements} />
        )}
      </div>
    </div>
  );
};

export default ProfileBody;
