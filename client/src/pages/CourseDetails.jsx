// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Navbar from '../components/Navbar';
import loaderGif from '../assets/spin.gif'; 

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(`Fetching course with ID: ${courseId}`);
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log('Course data:', response.data);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        
        {/* Main Content */}
        <div className="overflow-x-auto w-full">

        <div className="flex flex-col flex-grow p-10 ">        
          <div className="flex flex-col items-center  overflow-x-auto ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-x-auto  ">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

              {/* Conditional Rendering for Image or Video */}
              {course.videoLinks && course.videoLinks.length > 0 ? (
                <ReactPlayer
                  url={course.videoLinks[0]} // Assuming you want to show the first video
                  className=" object-cover rounded-lg mb-4 w-fit h-fit items-center"
                  controls
                />
              ) : (
                <img
                  src={course.image}
                  alt={course.title}
                  className=" h-64 object-cover rounded-lg mb-4 w-fit"
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
                <p>{course.description}</p>
              </div>

              {/* Course Content */}
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <div dangerouslySetInnerHTML={{ __html: course.course }} />
              </div>

              {/* Attachments Download Button */}
              {course.attachments && course.attachments.length > 0 && (
                <div className="mt-4 ">
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
      </div>
    </>
  );
};

export default CourseDetails;
