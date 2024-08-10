// DashVideos.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loaderGif from '../assets/spin.gif'; 
import ConfirmDeletePopup from '../components/ConfirmDeletePopupVideo'; // Make sure to create a similar popup for videos

function DashVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos', { withCredentials: true });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleDeleteVideo = async () => {
    if (!selectedVideoId) return;
    try {
      const response = await axios.delete(`/api/videos/${selectedVideoId}`, { withCredentials: true });
      if (response.status === 200) {
        setVideos(videos.filter(video => video._id !== selectedVideoId));
        console.log('Video deleted successfully');
      } else {
        console.error('Failed to delete video');
      }
    } catch (error) {
      console.error('Error deleting video', error);
    } finally {
      setPopupOpen(false);
      setSelectedVideoId(null);
    }
  };

  const handleOpenPopup = (videoId) => {
    setSelectedVideoId(videoId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedVideoId(null);
  };

  // Show loader while video data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-semibold mb-6">Video Section</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">Video List</h2>
          <Link
            to="/add-video"
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Add Video
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                YouTube URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map(video => (
              <tr key={video._id}>
                <td className="py-2 px-4 border-b">
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {video.youtubeUrl}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{video.courseTitle}</td>
                <td className='border-b py-2'>
                  <div className="flex gap-3">
                    <Link
                      to={`/view-video/${video._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-video/${video._id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpenPopup(video._id)}
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
        handleConfirm={handleDeleteVideo}
      />
    </div>
  );
}

export default DashVideos;
