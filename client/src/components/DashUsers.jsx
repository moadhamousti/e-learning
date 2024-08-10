// DashUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loaderGif from '../assets/spin.gif'; 
import ConfirmDeletePopup from '../components/ConfirmDeletePopupUser';

function DashUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      const response = await axios.delete(`/api/users/${selectedUserId}`, { withCredentials: true });
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== selectedUserId));
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user', error);
    } finally {
      setPopupOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleOpenPopup = (userId) => {
    setSelectedUserId(userId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedUserId(null);
  };

  // Show loader while user data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16 " />
      </div>
    );
  }

  return (
    <div className="flex-1 py-8 pl-3 pr-4 overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6">User Section</h1>

      <div className="bg-white p-3 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">User List</h2>
          <Link
            to="/add-user"
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Add User
          </Link>
        </div>
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base lg:text-lg">
          Image
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Role
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map(user => (
        <tr key={user._id}>
          <td className="py-2 px-4 border-b">
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 object-cover rounded-full"
            />
          </td>
          <td className="py-1 px-2 border-b">{user.name}</td>
          <td className="py-1 px-2 border-b">{user.email}</td>
          <td className="py-1 px-2 border-b">{user.isAdmin ? 'Admin' : 'User'}</td>
          <td className='border-b py-2'>
            <div className="flex gap-3">
              <Link
                to={`/view-user/${user._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                View
              </Link>
              <Link
                to={`/edit-user/${user._id}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleOpenPopup(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
      <ConfirmDeletePopup
        open={popupOpen}
        handleClose={handleClosePopup}
        handleConfirm={handleDeleteUser}
      />
    </div>
  );
}

export default DashUsers;
