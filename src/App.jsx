import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { getUsers, createUser, updateUser, deleteUser, addDummyUsers } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('location');
  const [sortOrder, setSortOrder] = useState('asc');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortField, sortOrder]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(currentPage);
      const sortedUsers = sortUsers(data.users, sortField, sortOrder);
      setUsers(sortedUsers);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      toast.success('User created successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(userData._id, userData);
      toast.success('User updated successfully');
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const handleDeleteUser = async () => {
    if (deleteUserId) {
      try {
        await deleteUser(deleteUserId);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Error deleting user');
      } finally {
        setDeleteModalOpen(false);
        setDeleteUserId(null);
      }
    }
  };

  const handleAddDummyUsers = async () => {
    try {
      await addDummyUsers();
      toast.success('Dummy users added successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error adding dummy users');
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const sortUsers = (users, field, order) => {
    return users.sort((a, b) => {
      if (field === 'age') {
        return order === 'asc' ? a.age - b.age : b.age - a.age;
      } else if (field === 'location') {
        return order === 'asc'
          ? a.location.localeCompare(b.location)
          : b.location.localeCompare(a.location);
      }
      return 0;
    });
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteUser();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GoforMeet User Profiles</h1>
      <UserForm 
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser} 
        initialData={editingUser} 
        isEdit={!!editingUser} 
      />
      <div className="mb-4 flex items-center">
        <button
          onClick={handleSortOrderChange}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Sort Order ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <select
          onChange={handleSortFieldChange}
          value={sortField}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
        >
          <option value="location">Location</option>
          <option value="age">Age</option>
        </select>
      </div>
      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={openDeleteModal} // Ensure this function is passed and works
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button
        onClick={handleAddDummyUsers}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Dummy Users
      </button>
      <ToastContainer />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
