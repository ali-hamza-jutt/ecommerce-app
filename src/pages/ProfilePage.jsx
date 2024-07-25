import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/userSlice';

const ProfilePage = () => {
  const userData = useSelector(selectUserData);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <div>container</div>
    </div>
  );
};

export default ProfilePage;
