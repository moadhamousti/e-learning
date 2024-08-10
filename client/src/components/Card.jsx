import React from 'react';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link } from 'react-router-dom';

const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
};

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

const CourseCard = ({ course }) => {
  const { _id, title, description, image, createdBy, videoLinks } = course;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl   m-4">
      <Link to={`/formation/course/${_id}`}>
        <img className="w-full" src={image} alt={title} />
      </Link>
      <div className="px-2 py-4">
      <Link to={`/formation/course/${_id}`} className="font-bold text-xl mb-2 hover:underline">
        {truncateTitle(title, 30)}
      </Link>
        <p className="text-gray-500 text-base">
          {truncateDescription(description, 40)}
          </p>
      </div>
      <div className="px-2 pt-4 pb-2 flex justify-between gap-2 items-center">
        <div className="flex items-center">
          <img
            className="w-7 h-7 rounded-full mr-2"
            src={createdBy?.image || 'default-avatar.png'}
            alt={createdBy?.name || 'Unknown Creator'}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{createdBy?.name || 'DELETED User'}</p>
          </div>
        </div>

        <Link to={`/formation/videos/${_id}`} className="flex items-center text-gray-600">
          <VideoLibraryIcon className="mr-1" />
          <span>{Array.isArray(videoLinks) ? videoLinks.length : 0} Videos</span>
          
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
