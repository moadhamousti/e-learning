import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; // Import ReactPlayer for video playback

import DashSidebar from '../components/DashSidebar';
import DashHome from '../components/DashHome';

const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [view, setView] = useState('home'); // Default to 'home' view

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(`Fetching course with ID: ${courseId}`); // Add logging
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log('Course data:', response.data); // Add logging
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error); // Add logging
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <DashSidebar />
      <h1 className="text-4xl font-bold m-4 text-[--button-color]">View Course</h1>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col items-center p-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

            {/* Conditional Rendering for Image or Video */}
            {course.videoLinks ? (
              <ReactPlayer
                url={course.videoLinks}
                className="w-full h-64 object-cover rounded-lg mb-4"
                controls
              />
            ) : (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <div className="flex justify-between">
              <p className="text-gray-500 mb-2">
                Created At: {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-4">
                Created By: {course.createdBy?.name || 'ADMIN'}
              </p>
            </div>

            <p className="text-start text-lg font-bold mb-4">Description</p>
            <div className="text-start mb-4">
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>

            {/* Course Content */}
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <div dangerouslySetInnerHTML={{ __html: course.course }} />
            </div>

            {/* Attachments Download Button */}
            {course.attachments && course.attachments.length > 0 && (
              <div className="mt-4">
                {course.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment}
                    download
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                  >
                    Download Attachment {index + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
