import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">{user.name}</h3>
          <p className="text-gray-600">Age: {user.age}</p>
          <p className="text-gray-600">Location: {user.location}</p>
          <p className="text-gray-600">Profession: {user.profession}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => onEdit(user)} // Ensure onEdit is a function and works correctly
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(user._id)} // Ensure onDelete is a function and receives the correct ID
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
