import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    profession: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData({ name: '', age: '', location: '', profession: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
        min="18"
        max="120"
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        placeholder="Profession"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isEdit ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default UserForm;