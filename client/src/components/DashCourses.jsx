// DashCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDeletePopup from '../components/ConfirmDeletePopupCourse';
import loaderGif from '../assets/spin.gif'; 

function DashCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('There was an error fetching the courses!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async () => {
    if (!selectedCourseId) return;
    try {
      const response = await axios.delete(`/api/courses/${selectedCourseId}`);
      if (response.status === 200) {
        setCourses(courses.filter(course => course._id !== selectedCourseId));
        console.log('Course deleted successfully');
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course', error);
    } finally {
      setPopupOpen(false);
      setSelectedCourseId(null);
    }
  };

  const handleOpenPopup = (courseId) => {
    setSelectedCourseId(courseId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedCourseId(null);
  };

  // Show loader while course data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-semibold mb-6">Courses Section</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">Course List</h2>
          <Link
            to="/add-course"
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Add Course
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div dangerouslySetInnerHTML={{ __html: course.description }} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <Link
                      to={`/view-course/${course._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/courses/edit/${course._id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpenPopup(course._id)}
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
      <ConfirmDeletePopup
        open={popupOpen}
        handleClose={handleClosePopup}
        handleConfirm={handleDeleteCourse}
      />
    </div>
  );
}

export default DashCourses;
