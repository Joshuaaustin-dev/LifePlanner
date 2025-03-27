import { BsClipboard2Data } from "react-icons/bs";
import { BsClipboard2Check } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";

const ProfileBody = ({ skills = [], achievements = [] }) => {
  // Skills in progress and completed count
  const skillsInProgress = skills.filter((skill) => !skill.completed).length;
  const skillsCompleted = skills.filter((skill) => skill.completed).length;

  // Achievements count
  const achievementsCount = achievements.length;

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
      <div className="row mb-4">
        {/* Skills In Progress */}
        <div className="col-12 col-md-4 d-flex align-items-center">
          <BsClipboard2Data size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills In Progress</h5>
            <p>{skillsInProgress}</p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex align-items-center">
          <BsClipboard2Check size={60} className="me-4" />
          <div className="count-box">
            <h5>Skills Completed</h5>
            <p>{skillsCompleted}</p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex align-items-center">
          <GrAchievement size={60} className="me-4" />
          <div className="count-box">
            <h5>Achievements</h5>
            <p>{achievementsCount}</p>
          </div>
        </div>
      </div>

      {/* Skills and Achievements Sections */}
      <Skills skills={skills} />
      <SkillsCompleted skills={skills} />
      <Achievements achievements={achievements} />
    </div>
  );
};

export default ProfileBody;
