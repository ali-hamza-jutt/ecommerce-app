import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/userSlice';

const ProfilePage = () => {
  const user = useSelector(selectUserData);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{user.firstName || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.email || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
