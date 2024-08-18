import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import { getUsers, addDummyUsers } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (newPage) => {
    fetchUsers(newPage);
  };

  const handleUserCreated = () => {
    fetchUsers(1);
  };

  const handleAddDummyUsers = async () => {
    try {
      await addDummyUsers();
      fetchUsers(1);
    } catch (error) {
      console.error('Error adding dummy users:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GoforMeet User Profiles</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create New Profile</h2>
        <UserForm onUserCreated={handleUserCreated} />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Profiles</h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <UserList users={users} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <div className="text-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddDummyUsers}
        >
          Add Dummy Users
        </button>
      </div>
    </div>
  );
}

export default App;