function EditProfile() {
  const handleClick = () => {
    alert("button clicked!");
  };

  return (
    <button className="btn-edit-profile" onClick={handleClick}>
      Edit Profile
    </button>
  );
  {
    /* User's Streak */
  }
  <div className="streak-section mb-3">
    <p>
      <MdOutlineLocalFireDepartment /> {user.loginStreak}
    </p>
  </div>;
}

export default EditProfile;
