import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">{user.name}</h3>
          <p className="text-gray-600">Age: {user.age}</p>
          <p className="text-gray-600">Location: {user.location}</p>
          <p className="text-gray-600">Profession: {user.profession}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;