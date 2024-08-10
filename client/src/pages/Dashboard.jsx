import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashSidebar from '../components/DashSidebar';
import DashUsers from '../components/DashUsers';
import DashHome from '../components/DashHome';
import DashCourses from '../components/DashCourses';
import DashVideos from './DashVideos';
import DashForms from './DashForms';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('/dashboard', { withCredentials: true });
        if (!response.data.isAdmin) {
          navigate('/login'); // Redirect to login if not admin
        }
      } catch (error) {
        navigate('/login'); // Redirect to login if any error occurs
      }
    };

    checkAdminStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <DashSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<DashHome />} />
          <Route path="users" element={<DashUsers />} />
          <Route path="courses" element={<DashCourses />} />
          {/* <Route path="videos" element={<DashVideos />} /> */}
          <Route path="forms" element={<DashForms />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
