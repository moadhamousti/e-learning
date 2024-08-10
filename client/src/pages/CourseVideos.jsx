// src/pages/CourseVideos.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseVideos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setVideos(response.data.videoLinks || []);
        setLoading(false);
      } catch (err) {
        setError('Error fetching course videos');
        setLoading(false);
      }
    };

    fetchCourseVideos();
  }, [courseId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Course Videos</h1>
        <div className="flex gap-10 justify-between w-full bg-none">
          <div className="flex flex-col gap-4 p-1 mb-8 w-48 max-w-52 h-[490px] rounded-md max-h-[720px] overflow-x-auto scrollbar-thin">
            {videos.map((video, index) => (
              <img
                key={index}
                src={`https://img.youtube.com/vi/${getYouTubeVideoId(video)}/mqdefault.jpg`}
                alt="Video Thumbnail"
                className="rounded-md shadow-xl cursor-pointer"
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
          <div className="w-11/12 h-full rounded-md shadow-md shadow-black bg-gray-100">
              {selectedVideo && (
              <div className="h-[490px]">
                <iframe
                  id="player"
                  type="text/html"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo)}`}
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-md shadow-xl"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Utility function to extract video ID from URL
const getYouTubeVideoId = (url) => {
  // Example URL: "https://www.youtube.com/watch?v=6QAELgirvjs"
  const urlObj = new URL(url);
  return urlObj.searchParams.get('v');
};

export default CourseVideos;
