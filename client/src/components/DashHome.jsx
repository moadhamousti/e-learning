import React, { useState, useEffect } from 'react';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';

function DashHome() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    // Fetch total users count
    axios.get('/api/users/count')
      .then(response => {
        setTotalUsers(response.data); // Assuming response.data is the count number
      })
      .catch(error => {
        console.error('Error fetching total users:', error);
      });

    // Fetch total courses count
    axios.get('/api/courses/count')
      .then(response => {
        setTotalCourses(response.data); // Assuming response.data is the count number
      })
      .catch(error => {
        console.error('Error fetching total courses:', error);
      });

    // Fetch all user details
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data); // Assuming response.data is an array of users with detailed info
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-semibold mb-6">Home Section</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className='text-2xl font-semibold uppercase my-2'>Welcome to the Home section!</p>
        <div className="w-full sm:grid grid-cols-2 my-2 flex flex-col gap-10">
          <div className="flex flex-col gap-2 py-4 px-6 bg-[--primary-color] text-[--secondary-color] rounded-lg shadow-md shadow-slate-700">
            <PeopleIcon className="bg-[--secondary-color] text-[--primary-color] p-1 rounded-full" fontSize='large' />
            <p className="text-3xl font-bold">{totalUsers}</p>
            <h2 className='text-2xl font-semibold'>
              Total Users
            </h2>
          </div>
          <div className="flex flex-col gap-1 py-4 px-6 bg-[--primary-color] text-[--secondary-color] rounded-lg shadow-md shadow-slate-700">
            <LaptopChromebookIcon className="bg-[--secondary-color] text-[--primary-color] p-1 rounded-full" fontSize='large' />
            <p className="text-3xl font-bold">{totalCourses}</p>
            <h2 className='text-2xl font-semibold'>
              Total Courses
            </h2>
          </div>
        </div>
      </div>
      <div className='p-4 bg-white my-5'>
        <table className="min-w-full py-5">
          <thead className='divide-gray-200'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.isAdmin ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashHome;
