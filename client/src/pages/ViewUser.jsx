import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';

const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [view, setView] = useState(''); // Add view state if needed
  const navigate = useNavigate(); // Use navigate for route switching

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          withCredentials: true, // if needed for authentication
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle view switching based on view state
  useEffect(() => {
    if (view) {
      navigate(`/${view}`); // Navigate to the route based on view
    }
  }, [view, navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <DashSidebar setView={setView} /> {/* Pass setView to DashSidebar */}

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold m-4 text-[--button-color]">View User</h1>
        <div className="flex flex-col items-center pt-14 min-h-screen w-1/2">
          <div className="flex flex-col items-center justify-center shadow-lg shadow-black rounded-lg w-2/4">
            <div className="flex items-center justify-center w-[292px] h-[292px]">
              <img
                src={user.image}
                alt="Profile"
                className="rounded-full w-[192px] h-[192px] object-cover shadow-md"
              />
            </div>
            <div className="w-full p-6">
              <p className="text-xl capitalize font-bold mb-4">
                Name: <span className="font-normal ml-2">{user.name}</span>
              </p>
              <p className="text-xl font-bold mb-4">
                Email: <span className="font-normal ml-2">{user.email}</span>
              </p>
              <p className="text-xl font-bold">
                Role: <span className="font-normal ml-2">{user.isAdmin ? 'Admin' : 'User'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
