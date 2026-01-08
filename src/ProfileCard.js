function ProfileCard(props) {
  return (
    <div className="profile-card" style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <img src={props.avatarUrl} alt="Profile" width="80" />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
    </div>
  );
}

export default ProfileCard;
